import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LapData } from '../model/LapData';

@Injectable()
export class LapDataService {
  constructor(
    @InjectRepository(LapData)
    private lapRepository: Repository<LapData>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<LapData[]> {
    return this.lapRepository.find();
  }

  findOne(id_lap_data: number): Promise<LapData> {
    return this.lapRepository.findOneBy({ id_lap_data });
  }

  async remove(id_lap_data: number): Promise<void> {
    await this.lapRepository.delete(id_lap_data);
  }

  async save(lapData: LapData): Promise<LapData> {
    try {
      return this.lapRepository.save(lapData);
    } catch (error) {
      console.log(error);
      console.log('Error saving lap');
    }
  }

  async saveAll(laps: LapData[]): Promise<LapData[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(LapData)
        .values(laps)
        .execute();
      return laps;
    } catch (error) {
      console.log('error', error);
      console.log('Error saving laps');
    }
  }
}
