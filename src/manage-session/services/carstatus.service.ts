import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CarStatusData } from '../model/CarStatusData';

@Injectable()
export class CarStatusDataService {
  constructor(
    @InjectRepository(CarStatusData)
    private carStatusRepository: Repository<CarStatusData>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<CarStatusData[]> {
    return this.carStatusRepository.find();
  }

  findOne(id_car_status: number): Promise<CarStatusData> {
    return this.carStatusRepository.findOneBy({ id_car_status });
  }

  async remove(m_sessionUID: number): Promise<void> {
    await this.carStatusRepository.delete(m_sessionUID);
  }

  async save(carStatusData: CarStatusData): Promise<CarStatusData> {
    try {
      return this.carStatusRepository.save(carStatusData);
    } catch (error) {
      console.log(error);
      console.log('Error guardando status de vehículo');
    }
  }

  async saveAll(carStatuses: CarStatusData[]): Promise<CarStatusData[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(CarStatusData)
        .values(carStatuses)
        .execute();
      return carStatuses;
    } catch (error) {
      console.log('error', error);
      console.log('Error guardando status de vehículos');
    }
  }
}
