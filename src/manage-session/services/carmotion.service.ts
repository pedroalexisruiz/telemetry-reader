import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CarMotionData } from '../model/CarMotionData';

@Injectable()
export class CarMotionDataService {
  constructor(
    @InjectRepository(CarMotionData)
    private carMotionRepository: Repository<CarMotionData>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<CarMotionData[]> {
    return this.carMotionRepository.find();
  }

  findOne(id_car_motion: number): Promise<CarMotionData> {
    return this.carMotionRepository.findOneBy({ id_car_motion });
  }

  async remove(id_car_motion: number): Promise<void> {
    await this.carMotionRepository.delete(id_car_motion);
  }

  async save(carMotionData: CarMotionData): Promise<CarMotionData> {
    try {
      return this.carMotionRepository.save(carMotionData);
    } catch (error) {
      console.log(error);
      console.log('Error saving motion');
    }
  }

  async saveAll(carMotions: CarMotionData[]): Promise<CarMotionData[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(CarMotionData)
        .values(carMotions)
        .execute();
      return carMotions;
    } catch (error) {
      console.log('error', error);
      console.log('Error saving multiple motions');
    }
  }
}
