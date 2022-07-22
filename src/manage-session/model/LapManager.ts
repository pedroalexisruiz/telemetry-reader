import { Injectable } from '@nestjs/common';
import { PacketSessionData } from './PacketSessionData';
import { LapData } from './LapData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { LapDataFactory } from '../factories/lap-data.factory';
import { PacketLapData } from '../dto/PacketLapData';
import { LapDataService } from '../services/lap.service';

@Injectable()
export class LapManager {
  laps: LapData[] = [];
  lastListeningTime: Date;

  constructor(
    private lapDataService: LapDataService,
    private lapDataFactory: LapDataFactory,
  ) {}

  async handlePacket(
    packetLapData: PacketLapData,
    currentSession: PacketSessionData,
    participantsQuantity: number,
  ) {
    const currentDate = new Date();
    const secondsToWaitNextData: number = parseInt(
      process.env.LAPS_SAVE_INTERVAL,
      10,
    );
    if (
      secondsToWaitNextData > 0 &&
      (!this.lastListeningTime ||
        getSecondsBetweenDates(this.lastListeningTime, currentDate) >=
          secondsToWaitNextData)
    ) {
      const { m_header, m_lapData } = packetLapData;
      if (
        currentSession &&
        participantsQuantity > 0 &&
        currentSession.m_sessionUID === m_header.m_sessionUID
      ) {
        const newStatus = this.lapDataFactory.toEntity({
          ...packetLapData,
          m_lapData: m_lapData.slice(0, participantsQuantity),
        });
        console.log('Temporarily storing lap', currentDate);
        this.laps = [...this.laps, ...newStatus];
        this.lastListeningTime = currentDate;
      }
    }
  }

  async saveLaps(): Promise<void> {
    console.log(`Saving ${this.laps.length} laps`);
    await this.lapDataService.saveAll(this.laps);
  }

  resetFlags(): void {
    this.laps = [];
  }
}
