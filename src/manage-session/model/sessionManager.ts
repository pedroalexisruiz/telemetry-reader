import { Inject, Injectable } from '@nestjs/common';
import { ParsedMessage } from 'src/types';
import { ClassificationService } from '../services/classification.service';
import { LapService } from '../services/lap.service';
import { PacketSessionDataService } from '../services/packetsessiondata.service';
import { ParticipantsService } from '../services/participants.service';
import { PACKETS } from '../../myconstants/packets';
import { PacketSessionHistoryData } from './PacketSessionHistoryData';
import { PacketSessionData } from './PacketSessionData';
import { PacketParticipantsData } from './PacketParticipantsData';
import { PacketFinalClassificationData } from './PacketFinalClassificationData';
import { DataSource } from 'typeorm';
import { CarStatusManager } from './CarStatusManager';
import { CarDamageManager } from './CarDamageManager';

@Injectable()
export class SessionManager {
  saveParticipants = true;
  saveResults = true;
  saveLapTimes = false;
  pilotsInSession: number = 0;
  pilotsSaved: number = 0;
  session: PacketSessionData;
  participants: PacketParticipantsData;
  finalClassification: PacketFinalClassificationData;
  laps: PacketSessionHistoryData[] = [];

  constructor(
    private packetSessionDataService: PacketSessionDataService,
    private participantsService: ParticipantsService,
    private classificationService: ClassificationService,
    private lapService: LapService,
    private carStatusManager: CarStatusManager,
    private carDamageManager: CarDamageManager,
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
      this.handleLaps(data);
    }
    if (packetID === PACKETS.session) {
      this.handleSession(data);
    }
    if (packetID === PACKETS.carStatus) {
      this.carStatusManager.handlePacket(data);
    }
    if (packetID === PACKETS.carDamage) {
      this.carDamageManager.handlePacket(
        data,
        this.session,
        this.pilotsInSession,
      );
    }
  }

  async handleLaps(data: any): Promise<void> {
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
    console.log('Saving participants in DB');
    await this.participantsService.saveAll(this.participants);
    console.log('Saving final classification in DB');
    await this.classificationService.saveAll(this.finalClassification);
    console.log('Saving lap times in DB');
    await this.lapService.bulkSave(this.laps);
    console.log('Saving car status in DB');
    await this.carStatusManager.saveCarStatus();
    this.carStatusManager.resetFlags();
    console.log('Saving car damages in DB');
    await this.carDamageManager.saveCarDamages();
    this.carDamageManager.resetFlags();

    try {
      // this.datasource.query(
      //   "INSERT INTO `packet_session_data` (`date`, `m_totalLaps`, `m_sessionType`, `m_trackId`, `m_sessionUID`) VALUES (CURRENT_TIMESTAMP, '5', '1', '1', 'dasadadasdadasd');",
      // );
    } catch (error) {
      console.log(
        'La query que estás intentando ejecutar genera un error en BD',
      );
    }

    this.session = null;
  }

  async handleSession(data: any): Promise<void> {
    const {
      m_header: { m_sessionUID },
      m_totalLaps,
      m_sessionType,
      m_trackId,
    } = data;
    if (!this.session || m_sessionUID !== this.session.m_sessionUID) {
      this.session = {
        m_sessionUID,
        m_totalLaps,
        m_sessionType,
        m_trackId,
        port: parseInt(process.env.UDP_PORT, 10),
      };
      console.log('Guardo en BD la session');
      await this.packetSessionDataService.save(this.session);
      this.resetSessionFlags();
    }
  }

  async handleParticipants(data: any): Promise<void> {
    if (this.saveParticipants) {
      this.saveParticipants = false;
      this.pilotsInSession = data.m_numActiveCars;
      console.log('almaceno participantes temporalmente');
      this.participants = data;
      this.carStatusManager.participantsQuantity = this.pilotsInSession;
    }
  }

  async handleResults(data: PacketFinalClassificationData): Promise<void> {
    if (this.saveResults) {
      console.log('almaceno resultados temporalmente');
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
    this.pilotsInSession = 0;
    this.carStatusManager.session = this.session;
  }
}
