import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ParticipantsDataFactory } from '../factories/participants-data.factory';
import { PacketParticipantsData } from '../model/PacketParticipantsData';
import { FinalClassificationData } from '../model/ClassificationData';
import { FinalClassificationDataFactory } from '../factories/final-classification-data.factory';
import { PacketFinalClassificationData } from '../model/PacketFinalClassificationData';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(FinalClassificationData)
    private sessionsRepository: Repository<FinalClassificationData>,
    private dataSource: DataSource,
    private finalClassificationDataFactory: FinalClassificationDataFactory,
  ) {}

  findAll(): Promise<FinalClassificationData[]> {
    return this.sessionsRepository.find();
  }

  findOne(
    index_in_session: number,
    m_sessionUID: string,
  ): Promise<FinalClassificationData> {
    return this.sessionsRepository.findOneBy({
      index_in_session,
      m_sessionUID,
    });
  }

  async remove(index_in_session: number, m_sessionUID: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(FinalClassificationData)
      .where({
        index_in_session,
        packetSessionData: { m_sessionUID },
      })
      .execute();
  }

  async save(
    packetSessionData: FinalClassificationData,
  ): Promise<FinalClassificationData> {
    return this.sessionsRepository.save(packetSessionData);
  }

  async saveAll(
    finalClassificationData: PacketFinalClassificationData,
  ): Promise<FinalClassificationData[]> {
    const results = this.finalClassificationDataFactory.toEntity(
      finalClassificationData,
    );
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(FinalClassificationData)
        .values(results)
        .execute();
      return result.generatedMaps as FinalClassificationData[];
    } catch (error) {
      console.log(error);
      console.log('Error guardando resultados de carrera');
    }
  }
}
