import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { CarTelemetryData } from '../CarTelemetryData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { CarTelemetryDataFactory } from '../../factories/car-telemetry-data.factory';
import { PacketCarTelemetryData } from '../../dto/PacketCarTelemetryData';
import { CarTelemetryDataService } from '../../services/car-telemetry.service';

@Injectable()
export class CarTelemetryManager {
  lastListeningTime: Date;

  constructor(
    private carTelemetryDataService: CarTelemetryDataService,
    private carTelemetryDataFactory: CarTelemetryDataFactory,
  ) {}

  async handlePacket(
    packetCarTelemetryData: PacketCarTelemetryData,
    currentSession: PacketSessionData,
    participantsQuantity: number,
  ) {
    const currentDate = new Date();
    const secondsToWaitNextData: number = parseFloat(
      process.env.CAR_TELEMETRY_SAVE_INTERVAL,
    );
    if (
      secondsToWaitNextData > 0 &&
      (!this.lastListeningTime ||
        getSecondsBetweenDates(this.lastListeningTime, currentDate) >=
          secondsToWaitNextData)
    ) {
      const { m_header, m_carTelemetryData } = packetCarTelemetryData;
      if (
        currentSession &&
        participantsQuantity > 0 &&
        currentSession.m_sessionUID === m_header.m_sessionUID
      ) {
        const carTelemetrys = this.carTelemetryDataFactory.toEntity({
          ...packetCarTelemetryData,
          m_carTelemetryData: m_carTelemetryData.slice(0, participantsQuantity),
        });
        this.saveCarTelemetrys(carTelemetrys);
        this.lastListeningTime = currentDate;
      }
    }
  }

  async saveCarTelemetrys(carTelemetrys: CarTelemetryData[]): Promise<void> {
    console.log(`Saving ${carTelemetrys.length} vehicle telemetrys`);
    await this.carTelemetryDataService.saveAll(carTelemetrys);
  }
}
