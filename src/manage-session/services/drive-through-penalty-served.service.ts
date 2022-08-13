import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DriveThroughPenaltyServed } from '../model/DriveThroughPenaltyServed';

@Injectable()
export class DriveThroughPenaltyServedService {
  constructor(
    @InjectRepository(DriveThroughPenaltyServed)
    private driveThroughPenaltyServedRepository: Repository<DriveThroughPenaltyServed>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<DriveThroughPenaltyServed[]> {
    return this.driveThroughPenaltyServedRepository.find();
  }

  findOne(
    id_drive_through_penalty_served: number,
  ): Promise<DriveThroughPenaltyServed> {
    return this.driveThroughPenaltyServedRepository.findOneBy({
      id_drive_through_penalty_served,
    });
  }

  async remove(id_drive_through_penalty_served: number): Promise<void> {
    await this.driveThroughPenaltyServedRepository.delete(
      id_drive_through_penalty_served,
    );
  }

  async save(
    driveThroughPenaltyServed: DriveThroughPenaltyServed,
  ): Promise<DriveThroughPenaltyServed> {
    try {
      return this.driveThroughPenaltyServedRepository.save(
        driveThroughPenaltyServed,
      );
    } catch (error) {
      console.log(error);
      console.log(
        `Error saving driveThroughPenaltyServed, port: ${parseInt(
          process.env.UDP_PORT,
          10,
        )}`,
      );
    }
  }

  async saveAll(
    laps: DriveThroughPenaltyServed[],
  ): Promise<DriveThroughPenaltyServed[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(DriveThroughPenaltyServed)
        .values(laps)
        .execute();
      return laps;
    } catch (error) {
      console.log('error', error);
      console.log(
        `Error saving driveThroughPenaltiesServed, port: ${parseInt(
          process.env.UDP_PORT,
          10,
        )}`,
      );
    }
  }
}
