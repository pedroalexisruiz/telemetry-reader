import { Inject, Injectable } from '@nestjs/common';
import { ParsedMessage } from 'src/types';
import { ClassificationService } from '../../services/classification.service';
import { LapHistoryService } from '../../services/lap-history.service';
import { PacketSessionDataService } from '../../services/packetsessiondata.service';
import { ParticipantsService } from '../../services/participants.service';
import { PACKETS } from '../../../myconstants/packets';
import { PacketSessionHistoryData } from '../../dto/PacketSessionHistoryData';
import { PacketSessionData } from '../PacketSessionData';
import { PacketParticipantsData } from '../PacketParticipantsData';
import { PacketFinalClassificationData } from '../PacketFinalClassificationData';
import { DataSource } from 'typeorm';
import { CarStatusManager } from './CarStatusManager';
import { CarDamageManager } from './CarDamageManager';
import { CarMotionManager } from './CarMotionManager';
import { LapManager } from './LapManager';
import { CarTelemetryManager } from './CarTelemetryManager';
import { EventManager } from './EventManager';
import { CalendarService } from 'src/manage-session/services/calendar.service';

@Injectable()
export class SessionManager {
  saveParticipants = true;
  saveResults = true;
  saveLapTimes = false;
  pilotsInSession: number = 20;
  pilotsSaved: number = 0;
  session: PacketSessionData;
  participants: PacketParticipantsData;
  finalClassification: PacketFinalClassificationData;
  laps: PacketSessionHistoryData[] = [];

  constructor(
    private packetSessionDataService: PacketSessionDataService,
    private participantsService: ParticipantsService,
    private classificationService: ClassificationService,
    private lapService: LapHistoryService,
    private carStatusManager: CarStatusManager,
    private carDamageManager: CarDamageManager,
    private carMotionManager: CarMotionManager,
    private lapManager: LapManager,
    private carTelemetryManager: CarTelemetryManager,
    private eventManager: EventManager,
    private calendarService: CalendarService,
    @Inject('DATA_SOURCE') private datasource: DataSource,
  ) {}

  async handlePacket(parsedMsg: ParsedMessage) {
    const {
      packetID,
      packetData: { data },
    } = parsedMsg;
    if (packetID === PACKETS.participants) {
      this.handleParticipants(data);
    }

    if (packetID === PACKETS.finalClassification) {
      this.handleResults(data);
    }

    if (packetID === PACKETS.sessionHistory) {
      this.handleHistoryLaps(data);
    }
    if (packetID === PACKETS.session) {
      this.handleSession(data);
    }
    if (packetID === PACKETS.carStatus) {
      this.carStatusManager.handlePacket(
        data,
        this.session,
        this.pilotsInSession,
      );
    }
    if (packetID === PACKETS.carDamage) {
      this.carDamageManager.handlePacket(
        data,
        this.session,
        this.pilotsInSession,
      );
    }
    if (packetID === PACKETS.motion) {
      this.carMotionManager.handlePacket(
        data,
        this.session,
        this.pilotsInSession,
      );
    }
    if (packetID === PACKETS.lapData) {
      this.lapManager.handlePacket(data, this.session, this.pilotsInSession);
    }
    if (packetID === PACKETS.carTelemetry) {
      this.carTelemetryManager.handlePacket(
        data,
        this.session,
        this.pilotsInSession,
      );
    }
    if (packetID === PACKETS.event) {
      this.eventManager.handlePacket(data, this.session);
    }
  }

  async handleHistoryLaps(data: any): Promise<void> {
    if (this.saveLapTimes) {
      if (this.pilotsSaved < this.pilotsInSession) {
        this.laps.push(data);
        this.pilotsSaved++;
      }
      if (this.session && this.pilotsSaved === this.pilotsInSession) {
        this.saveSessionData();
      }
    }
  }

  async saveSessionData(): Promise<void> {
    this.session = null;
    console.log(
      `Saving final classification in DB, port: ${parseInt(
        process.env.UDP_PORT,
        10,
      )}`,
    );
    await this.classificationService.saveAll(this.finalClassification);
    console.log(
      `Saving lap times and tyre stints in DB, port: ${parseInt(
        process.env.UDP_PORT,
        10,
      )}`,
    );
    await this.lapService.bulkSave(this.laps);

    try {
      // this.datasource.query(
      //   "INSERT INTO `packet_session_data` (`date`, `m_totalLaps`, `m_sessionType`, `m_trackId`, `m_sessionUID`) VALUES (CURRENT_TIMESTAMP, '5', '1', '1', 'dasadadasdadasd');",
      // );
    } catch (error) {
      console.log(
        'La query que estás intentando ejecutar genera un error en BD',
      );
    }
  }

  async handleSession(data: any): Promise<void> {
    const {
      m_header: { m_sessionUID },
      m_totalLaps,
      m_sessionType,
      m_trackId,
    } = data;
    if (!this.session || m_sessionUID !== this.session.m_sessionUID) {
      const port = parseInt(process.env.UDP_PORT, 10);
      const calendar = await this.calendarService.findNextEmpty(
        port,
        m_sessionType,
      );
      const session = {
        m_sessionUID,
        m_totalLaps,
        m_sessionType,
        m_trackId,
        port,
        id_calendar: calendar ? calendar.id_calendar : null,
      };
      if (calendar) {
        calendar.is_saved = true;
        await this.calendarService.save(calendar);
        console.log(
          `Sesión enlazada al calendario, port: ${parseInt(
            process.env.UDP_PORT,
            10,
          )}`,
        );
      } else {
        console.log(
          `No existía calendario para esta sesión, deberás enlazarla manualmente, port: ${parseInt(
            process.env.UDP_PORT,
            10,
          )}`,
        );
      }
      try {
        console.log(
          `Saving session in BD, port: ${parseInt(process.env.UDP_PORT, 10)}`,
        );
        await this.packetSessionDataService.save(session);
        this.session = session;
        this.resetSessionFlags();
      } catch (error) {
        console.log(
          `Error saving session in BD, port: ${parseInt(
            process.env.UDP_PORT,
            10,
          )}`,
        );
        console.log(error);
      }
    }
  }

  async handleParticipants(data: any): Promise<void> {
    if (this.saveParticipants && this.session) {
      this.participants = data;
      console.log(
        `Saving participants in DB, port: ${parseInt(
          process.env.UDP_PORT,
          10,
        )}`,
      );
      await this.participantsService.saveAll(this.participants);
    }
  }

  async handleResults(data: PacketFinalClassificationData): Promise<void> {
    if (this.saveResults) {
      console.log(
        `temporarily storing results, port: ${parseInt(
          process.env.UDP_PORT,
          10,
        )}`,
      );
      this.finalClassification = data;
      this.saveResults = false;
      this.saveLapTimes = true;
    }
  }

  resetSessionFlags(): void {
    this.saveParticipants = true;
    this.saveResults = true;
    this.saveLapTimes = false;
    this.laps = [];
    this.pilotsSaved = 0;
  }
}
