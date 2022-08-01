import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { CarMotionData } from '../CarMotionData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { CarMotionDataFactory } from '../../factories/car-motion-data.factory';
import { PacketMotionData } from '../../dto/PacketMotionData';
import { CarMotionDataService } from '../../services/carmotion.service';

@Injectable()
export class CarMotionManager {
  lastListeningTime: Date;

  constructor(
    private carMotionDataService: CarMotionDataService,
    private carMotionDataFactory: CarMotionDataFactory,
  ) {}

  async handlePacket(
    packetCarMotionData: PacketMotionData,
    currentSession: PacketSessionData,
    participantsQuantity: number,
  ) {
    const currentDate = new Date();
    const secondsToWaitNextData: number = parseFloat(
      process.env.MOTION_SAVE_INTERVAL,
    );
    if (
      secondsToWaitNextData > 0 &&
      (!this.lastListeningTime ||
        getSecondsBetweenDates(this.lastListeningTime, currentDate) >=
          secondsToWaitNextData)
    ) {
      const { m_header, m_carMotionData } = packetCarMotionData;
      if (
        currentSession &&
        participantsQuantity > 0 &&
        currentSession.m_sessionUID === m_header.m_sessionUID
      ) {
        const carMotions = this.carMotionDataFactory.toEntity({
          ...packetCarMotionData,
          m_carMotionData: m_carMotionData.slice(0, participantsQuantity),
        });
        this.saveCarMotions(carMotions);
        this.lastListeningTime = currentDate;
      }
    }
  }

  async saveCarMotions(carMotions:CarMotionData[]): Promise<void> {
    console.log(`Saving ${carMotions.length} vehicle motions`);
    await this.carMotionDataService.saveAll(carMotions);
  }
}
