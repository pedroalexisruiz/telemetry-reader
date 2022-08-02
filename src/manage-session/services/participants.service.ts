import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ParticipantsDataFactory } from '../factories/participants-data.factory';
import { PacketParticipantsData } from '../model/PacketParticipantsData';
import { ParticipantData } from '../model/ParticipantData';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(ParticipantData)
    private sessionsRepository: Repository<ParticipantData>,
    private dataSource: DataSource,
    private participantsDataFactory: ParticipantsDataFactory,
  ) {}

  findAll(): Promise<ParticipantData[]> {
    return this.sessionsRepository.find();
  }

  findOne(m_name: string, m_sessionUID: string): Promise<ParticipantData> {
    return this.sessionsRepository.findOneBy({
      m_name,
      m_sessionUID,
    });
  }

  async remove(m_name: string, m_sessionUID: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(ParticipantData)
      .where({
        m_name,
        packetSessionData: { m_sessionUID },
      })
      .execute();
  }

  async save(packetSessionData: ParticipantData): Promise<ParticipantData> {
    return this.sessionsRepository.save(packetSessionData);
  }

  async saveAll(
    packetParticipantsData: PacketParticipantsData,
  ): Promise<ParticipantData[]> {
    const participants = this.participantsDataFactory.toEntity(
      packetParticipantsData,
    );
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(ParticipantData)
        .values(participants)
        .orUpdate(
          [
            'm_name',
            'm_aiControlled',
            'm_driverId',
            'm_networkId',
            'm_teamId',
            'm_myTeam',
            'm_raceNumber',
            'm_nationality',
            'm_yourTelemetry',
          ],
          ['index_in_session', 'm_sessionUID'],
        )
        .execute();
      return participants;
    } catch (error) {
      console.log('Some participants already existed in bd');
    }
  }
}
