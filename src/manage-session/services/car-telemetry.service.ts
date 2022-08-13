import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CarTelemetryData } from '../model/CarTelemetryData';

@Injectable()
export class CarTelemetryDataService {
  constructor(
    @InjectRepository(CarTelemetryData)
    private carTelemetryRepository: Repository<CarTelemetryData>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<CarTelemetryData[]> {
    return this.carTelemetryRepository.find();
  }

  findOne(id_car_telemetry_data: number): Promise<CarTelemetryData> {
    return this.carTelemetryRepository.findOneBy({ id_car_telemetry_data });
  }

  async remove(m_sessionUID: number): Promise<void> {
    await this.carTelemetryRepository.delete(m_sessionUID);
  }

  async save(carTelemetryData: CarTelemetryData): Promise<CarTelemetryData> {
    try {
      return this.carTelemetryRepository.save(carTelemetryData);
    } catch (error) {
      console.log(error);
      console.log(
        `Error saving car telemetry, port: ${parseInt(
          process.env.UDP_PORT,
          10,
        )}`,
      );
    }
  }

  async saveAll(
    carTelemetrys: CarTelemetryData[],
  ): Promise<CarTelemetryData[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(CarTelemetryData)
        .values(carTelemetrys)
        .execute();
      return carTelemetrys;
    } catch (error) {
      console.log('error', error);
      console.log(
        `Error saving car telemetrys, port: ${parseInt(
          process.env.UDP_PORT,
          10,
        )}`,
      );
    }
  }
}
