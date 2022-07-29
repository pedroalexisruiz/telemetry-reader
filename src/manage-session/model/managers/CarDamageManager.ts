import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { CarDamageData } from '../CarDamageData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { CarDamagesDataFactory } from '../../factories/car-damage-data.factory';
import { PacketCarDamageData } from '../../dto/PacketCarDamageData';
import { CarDamageDataService } from '../../services/cardamage.service';

@Injectable()
export class CarDamageManager {
  carDamages: CarDamageData[] = [];
  lastListeningTime: Date;

  constructor(
    private carDamageDataService: CarDamageDataService,
    private carDamageDataFactory: CarDamagesDataFactory,
  ) {}

  async handlePacket(
    packetCarDamageData: PacketCarDamageData,
    currentSession: PacketSessionData,
    participantsQuantity: number,
  ) {
    const currentDate = new Date();
    const secondsToWaitNextData: number = parseFloat(
      process.env.CAR_DAMAGE_SAVE_INTERVAL,
    );
    if (
      secondsToWaitNextData > 0 &&
      (!this.lastListeningTime ||
        getSecondsBetweenDates(this.lastListeningTime, currentDate) >=
          secondsToWaitNextData)
    ) {
      const { m_header, m_carDamageData } = packetCarDamageData;
      if (
        currentSession &&
        participantsQuantity > 0 &&
        currentSession.m_sessionUID === m_header.m_sessionUID
      ) {
        const newStatus = this.carDamageDataFactory.toEntity({
          ...packetCarDamageData,
          m_carDamageData: m_carDamageData.slice(0, participantsQuantity),
        });
        console.log('Temporarily storing vehicle damage', currentDate);
        this.carDamages = [...this.carDamages, ...newStatus];
        this.lastListeningTime = currentDate;
      }
    }
  }

  async saveCarDamages(): Promise<void> {
    console.log(`Saving ${this.carDamages.length} vehicle damages`);
    await this.carDamageDataService.saveAll(this.carDamages);
  }

  resetFlags(): void {
    this.carDamages = [];
  }
}
