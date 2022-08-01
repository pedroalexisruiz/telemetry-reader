import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { Penalty } from '../Penalty';
import { PenaltyFactory as PenaltyFactory } from '../../factories/penalty.factory';
import { PenaltyService } from '../../services/penalty.service';
import { PacketEventData } from 'src/manage-session/dto/PacketEventData';
import { SpeedTrap } from '../SpeedTrap';
import { SpeedTrapService } from 'src/manage-session/services/speed-trap.service';
import { SpeedTrapFactory } from 'src/manage-session/factories/speed-trap.factory';
import { DriveThroughPenaltyServedService } from 'src/manage-session/services/drive-through-penalty-served.service';
import { DriveThroughPenaltyServedFactory } from 'src/manage-session/factories/drive-through-penalty-served.factory';
import { StopGoPenaltyServedService } from 'src/manage-session/services/stop-go-penalty-served.service';
import { StopGoPenaltyServedFactory } from 'src/manage-session/factories/stop-go-penalty-served.factory';

@Injectable()
export class EventManager {
  eventsToSave = ['SPTP', 'PENA', 'DTSV', 'SGSV'];

  constructor(
    private penaltyService: PenaltyService,
    private penaltyFactory: PenaltyFactory,
    private speedTrapService: SpeedTrapService,
    private speedTrapFactory: SpeedTrapFactory,
    private driveThroughServedService: DriveThroughPenaltyServedService,
    private driveThroughServedFactory: DriveThroughPenaltyServedFactory,
    private stopAndGoServedService: StopGoPenaltyServedService,
    private stopAndGoServedFactory: StopGoPenaltyServedFactory,
  ) {}

  async handlePacket(
    packetEvent: PacketEventData,
    currentSession: PacketSessionData,
  ) {
    const { m_header } = packetEvent;
    if (
      currentSession &&
      currentSession.m_sessionUID === m_header.m_sessionUID &&
      this.eventsToSave.includes(packetEvent.m_eventStringCode)
    ) {
      switch (packetEvent.m_eventStringCode) {
        case 'SPTP':
          this.handleSpeedTrap(packetEvent);
          break;
        case 'PENA':
          this.handlePenalty(packetEvent);
          break;
        case 'DTSV':
          this.handleDriveThroughServed(packetEvent);
          break;
        case 'SGSV':
          this.handleStopAndGoServed(packetEvent);
          break;
        default:
          break;
      }
    }
  }

  private async handlePenalty(packetEvent: PacketEventData) {
    const penalty = this.penaltyFactory.toEntity({
      ...packetEvent,
    });
    console.log(`Saving penalty`);
    await this.penaltyService.save(penalty);
  }

  private async handleSpeedTrap(packetEvent: PacketEventData) {
    const speedTrap = this.speedTrapFactory.toEntity({
      ...packetEvent,
    });
    console.log(`Saving speedTrap`);
    await this.speedTrapService.save(speedTrap);
  }

  private async handleDriveThroughServed(packetEvent: PacketEventData) {
    const driveThroughServed = this.driveThroughServedFactory.toEntity({
      ...packetEvent,
    });
    console.log(`Saving driveThroughServed`);
    await this.driveThroughServedService.save(driveThroughServed);
  }

  private async handleStopAndGoServed(packetEvent: PacketEventData) {
    const stopAndGo = this.stopAndGoServedFactory.toEntity({
      ...packetEvent,
    });
    console.log(`Saving stopAndGosServed`);
    await this.stopAndGoServedService.save(stopAndGo);
  }
}
