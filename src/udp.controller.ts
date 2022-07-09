import { Controller } from '@nestjs/common';
import { Ctx, Payload } from '@nestjs/microservices';
import { F1TelemetryClient } from './client';
import { IncomingMessage, UDPGateWay } from './decorators';
import { ClassificationService } from './manage-session/services/classification.service';
import { LapService } from './manage-session/services/lap.service';
import { PacketSessionDataService } from './manage-session/services/packetsessiondata.service';
import { ParticipantsService } from './manage-session/services/participants.service';
import { PACKETS } from './myconstants';
import { UdpContext } from './server';
import { ParsedMessage } from './types';

@UDPGateWay()
@Controller()
export class UDPController {
  imprimiParticipantes = true;
  imprimirResultados = true;
  saveLapTimes = false;
  m_sessionUID: string = null;
  pilotsInSession: number;
  pilotsSaved: number = 0;

  constructor(
    private packetSessionDataService: PacketSessionDataService,
    private participantsService: ParticipantsService,
    private classificationService: ClassificationService,
    private lapService: LapService,
  ) {}

  @IncomingMessage()
  public async message(@Payload() data, @Ctx() ctx: UdpContext) {
    const parsedMsg: ParsedMessage | undefined =
      F1TelemetryClient.parseBufferMessage(data);
    if (
      parsedMsg &&
      parsedMsg.packetID === PACKETS.participants &&
      this.imprimiParticipantes
    ) {
      console.log('guardo participantes');
      await this.participantsService.saveAll(parsedMsg.packetData.data);
      this.pilotsInSession = parsedMsg.packetData.data.m_numActiveCars;
      this.imprimiParticipantes = false;
    }

    if (
      parsedMsg &&
      parsedMsg.packetID === PACKETS.finalClassification &&
      this.imprimirResultados
    ) {
      console.log('Guardo resultados');
      this.classificationService.saveAll(parsedMsg.packetData.data);
      this.imprimirResultados = false;
      this.saveLapTimes = true;
    }

    if (
      parsedMsg &&
      parsedMsg.packetID === PACKETS.sessionHistory &&
      this.saveLapTimes
    ) {
      if (this.pilotsSaved < this.pilotsInSession) {
        console.log('Guardo tiempos de vuelta');
        this.lapService.saveAll(parsedMsg.packetData.data);
        this.pilotsSaved++;
      }
      if (this.pilotsSaved === this.pilotsInSession) {
        this.saveLapTimes = false;
      }
    }
    if (parsedMsg && parsedMsg.packetID === PACKETS.session) {
      const {
        m_header: { m_sessionUID },
        m_totalLaps,
        m_sessionType,
        m_trackId,
      } = parsedMsg.packetData.data;
      if (m_sessionUID !== this.m_sessionUID) {
        console.log('guardo sesión');
        this.packetSessionDataService.save({
          m_sessionUID,
          m_totalLaps,
          m_sessionType,
          m_trackId,
        });
        this.m_sessionUID = m_sessionUID;
        this.imprimiParticipantes = true;
        this.imprimirResultados = true;
        this.saveLapTimes = false;
        this.pilotsSaved = 0;
        this.pilotsInSession = 0;
      }
    }
    return data;
  }
}
