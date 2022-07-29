import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { StopGoPenaltyServed } from '../model/StopGoPenaltyServed';

@Injectable()
export class StopGoPenaltyServedService {
  constructor(
    @InjectRepository(StopGoPenaltyServed)
    private stopGoPenaltyServedRepository: Repository<StopGoPenaltyServed>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<StopGoPenaltyServed[]> {
    return this.stopGoPenaltyServedRepository.find();
  }

  findOne(id_stop_go_penalty_served: number): Promise<StopGoPenaltyServed> {
    return this.stopGoPenaltyServedRepository.findOneBy({
      id_stop_go_penalty_served,
    });
  }

  async remove(id_stop_go_penalty_served: number): Promise<void> {
    await this.stopGoPenaltyServedRepository.delete(id_stop_go_penalty_served);
  }

  async save(
    stopGoPenaltyServed: StopGoPenaltyServed,
  ): Promise<StopGoPenaltyServed> {
    try {
      return this.stopGoPenaltyServedRepository.save(stopGoPenaltyServed);
    } catch (error) {
      console.log(error);
      console.log('Error saving stopGoPenaltyServed');
    }
  }

  async saveAll(laps: StopGoPenaltyServed[]): Promise<StopGoPenaltyServed[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(StopGoPenaltyServed)
        .values(laps)
        .execute();
      return laps;
    } catch (error) {
      console.log('error', error);
      console.log('Error saving stop Go Penalties Served');
    }
  }
}
