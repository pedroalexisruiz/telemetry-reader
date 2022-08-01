import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { PacketCarStatusData } from '../PacketCarStatusData';
import { CarStatusDataService } from '../../services/carstatus.service';
import { CarStatusData } from '../CarStatusData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { CarStatusesDataFactory } from '../../factories/car-status-data.factory';

@Injectable()
export class CarStatusManager {
  lastListeningTime: Date;

  constructor(
    private carStatusDataService: CarStatusDataService,
    private carStatusDataFactory: CarStatusesDataFactory,
  ) {}

  async handlePacket(
    packetCarStatusData: PacketCarStatusData,
    currentSession: PacketSessionData,
    participantsQuantity: number,
  ) {
    const currentDate = new Date();
    const secondsToWaitNextData: number = parseFloat(
      process.env.CAR_STATUS_SAVE_INTERVAL,
    );
    if (
      secondsToWaitNextData > 0 &&
      (!this.lastListeningTime ||
        getSecondsBetweenDates(this.lastListeningTime, currentDate) >=
          secondsToWaitNextData)
    ) {
      const { m_header, m_carStatusData } = packetCarStatusData;
      if (
        currentSession &&
        participantsQuantity > 0 &&
        currentSession.m_sessionUID === m_header.m_sessionUID
      ) {
        const newStatus = this.carStatusDataFactory.toEntity({
          ...packetCarStatusData,
          m_carStatusData: m_carStatusData.slice(0, participantsQuantity),
        });
        this.saveCarStatus(newStatus);
        this.lastListeningTime = currentDate;
      }
    }
  }

  async saveCarStatus(carsStatus: CarStatusData[]): Promise<void> {
    console.log(`Guardo ${carsStatus.length} status de vehículo`);
    await this.carStatusDataService.saveAll(carsStatus);
  }
}
