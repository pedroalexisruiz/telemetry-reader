import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { CarDamageData } from '../CarDamageData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { CarDamagesDataFactory } from '../../factories/car-damage-data.factory';
import { PacketCarDamageData } from '../../dto/PacketCarDamageData';
import { CarDamageDataService } from '../../services/cardamage.service';

@Injectable()
export class CarDamageManager {
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
        const carsDamages = this.carDamageDataFactory.toEntity({
          ...packetCarDamageData,
          m_carDamageData: m_carDamageData.slice(0, participantsQuantity),
        });
        this.saveCarDamages(carsDamages);
        this.lastListeningTime = currentDate;
      }
    }
  }

  async saveCarDamages(carsDamages: CarDamageData[]): Promise<void> {
    console.log(
      `Saving ${carsDamages.length} vehicle damages, port: ${parseInt(
        process.env.UDP_PORT,
        10,
      )}`,
    );
    await this.carDamageDataService.saveAll(carsDamages);
  }
}
