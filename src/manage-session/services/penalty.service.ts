import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Penalty } from '../model/Penalty';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private penaltyRepository: Repository<Penalty>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Penalty[]> {
    return this.penaltyRepository.find();
  }

  findOne(id_penalty: number): Promise<Penalty> {
    return this.penaltyRepository.findOneBy({ id_penalty });
  }

  async remove(id_penalty: number): Promise<void> {
    await this.penaltyRepository.delete(id_penalty);
  }

  async save(penalty: Penalty): Promise<Penalty> {
    try {
      return this.penaltyRepository.save(penalty);
    } catch (error) {
      console.log(error);
      console.log('Error saving penalty');
    }
  }

  async saveAll(laps: Penalty[]): Promise<Penalty[]> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Penalty)
        .values(laps)
        .execute();
      return laps;
    } catch (error) {
      console.log('error', error);
      console.log('Error saving penalties');
    }
  }
}
