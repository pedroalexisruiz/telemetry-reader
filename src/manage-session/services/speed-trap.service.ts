import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SpeedTrap } from '../model/SpeedTrap';

@Injectable()
export class SpeedTrapService {
  constructor(
    @InjectRepository(SpeedTrap)
    private speedTrapRepository: Repository<SpeedTrap>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<SpeedTrap[]> {
    return this.speedTrapRepository.find();
  }

  findOne(id_speed_trap: number): Promise<SpeedTrap> {
    return this.speedTrapRepository.findOneBy({ id_speed_trap });
  }

  async remove(id_speed_trap: number): Promise<void> {
    await this.speedTrapRepository.delete(id_speed_trap);
  }

  async save(speedTrap: SpeedTrap): Promise<SpeedTrap> {
    try {
      return this.speedTrapRepository.save(speedTrap);
    } catch (error) {
      console.log(error);
      console.log(
        `Error saving speedTrap, port: ${parseInt(process.env.UDP_PORT, 10)}`,
      );
    }
  }

  async saveAll(laps: SpeedTrap[]): Promise<SpeedTrap[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(SpeedTrap)
        .values(laps)
        .execute();
      return laps;
    } catch (error) {
      console.log('error', error);
      console.log(
        `Error saving speedTraps, port: ${parseInt(process.env.UDP_PORT, 10)}`,
      );
    }
  }
}
