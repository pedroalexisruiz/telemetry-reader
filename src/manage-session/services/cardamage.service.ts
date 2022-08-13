import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CarDamageData } from '../model/CarDamageData';

@Injectable()
export class CarDamageDataService {
  constructor(
    @InjectRepository(CarDamageData)
    private carDamageRepository: Repository<CarDamageData>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<CarDamageData[]> {
    return this.carDamageRepository.find();
  }

  findOne(id_car_damage: number): Promise<CarDamageData> {
    return this.carDamageRepository.findOneBy({ id_car_damage });
  }

  async remove(m_sessionUID: number): Promise<void> {
    await this.carDamageRepository.delete(m_sessionUID);
  }

  async save(carDamageData: CarDamageData): Promise<CarDamageData> {
    try {
      return this.carDamageRepository.save(carDamageData);
    } catch (error) {
      console.log(error);
      console.log(
        `Error saving car damage, port: ${parseInt(process.env.UDP_PORT, 10)}`,
      );
    }
  }

  async saveAll(carDamages: CarDamageData[]): Promise<CarDamageData[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(CarDamageData)
        .values(carDamages)
        .execute();
      return carDamages;
    } catch (error) {
      console.log('error', error);
      console.log(
        `Error saving car damages, port: ${parseInt(process.env.UDP_PORT, 10)}`,
      );
    }
  }
}
