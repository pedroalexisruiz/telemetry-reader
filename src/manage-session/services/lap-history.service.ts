import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LapHistoryData } from '../model/LapHistoryData';
import { LapHistoryDataFactory } from '../factories/lap-history-data.factory';
import { PacketSessionHistoryData } from '../model/PacketSessionHistoryData';

@Injectable()
export class LapHistoryService {
  constructor(
    @InjectRepository(LapHistoryData)
    private sessionsRepository: Repository<LapHistoryData>,
    private dataSource: DataSource,
    private lapDataFactory: LapHistoryDataFactory,
  ) {}

  findAll(): Promise<LapHistoryData[]> {
    return this.sessionsRepository.find();
  }

  findOne(
    m_carIdx: number,
    m_sessionUID: string,
    lap_number: number,
  ): Promise<LapHistoryData> {
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
      .from(LapHistoryData)
      .where({
        index_in_session,
        packetSessionData: { m_sessionUID },
      })
      .execute();
  }

  async saveAll(
    sessionHistoryData: PacketSessionHistoryData,
  ): Promise<LapHistoryData[]> {
    const results = this.lapDataFactory.toEntity(sessionHistoryData);
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(LapHistoryData)
        .values(results)
        .execute();
      return result.generatedMaps as LapHistoryData[];
    } catch (error) {
      console.log(error);
      console.log('Error guardando datos de vuelta');
    }
  }

  async bulkSave(
    sessionsHistoryData: PacketSessionHistoryData[],
  ): Promise<LapHistoryData[]> {
    let laps: LapHistoryData[] = [];
    sessionsHistoryData.forEach((sessionHistoryPerParticipant) => {
      laps = [
        ...laps,
        ...this.lapDataFactory.toEntity(sessionHistoryPerParticipant),
      ];
    });

    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(LapHistoryData)
        .values(laps)
        .execute();
      return result.generatedMaps as LapHistoryData[];
    } catch (error) {
      console.log(error);
      console.log('Error guardando datos de vuelta');
    }
  }
}
