import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FinalClassificationData } from '../model/ClassificationData';
import { LapData } from '../model/LapData';
import { LapDataFactory } from '../factories/lap-data.factory';
import { PacketSessionHistoryData } from '../model/PacketSessionHistoryData';

@Injectable()
export class LapService {
  constructor(
    @InjectRepository(LapData)
    private sessionsRepository: Repository<LapData>,
    private dataSource: DataSource,
    private lapDataFactory: LapDataFactory,
  ) {}

  findAll(): Promise<LapData[]> {
    return this.sessionsRepository.find();
  }

  findOne(
    m_carIdx: number,
    m_sessionUID: string,
    lap_number: number,
  ): Promise<LapData> {
    return this.sessionsRepository.findOneBy({
      m_carIdx,
      m_sessionUID,
      lap_number,
    });
  }

  async remove(index_in_session: number, m_sessionUID: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(LapData)
      .where({
        index_in_session,
        packetSessionData: { m_sessionUID },
      })
      .execute();
  }

  async saveAll(
    sessionHistoryData: PacketSessionHistoryData,
  ): Promise<LapData[]> {
    const results = this.lapDataFactory.toEntity(sessionHistoryData);
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(LapData)
        .values(results)
        .execute();
      return result.generatedMaps as LapData[];
    } catch (error) {
      console.log(error);
      console.log('Error guardando datos de vuelta');
    }
  }
}
