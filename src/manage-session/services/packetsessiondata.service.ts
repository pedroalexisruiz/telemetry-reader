import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacketSessionData } from '../model/PacketSessionData';

@Injectable()
export class PacketSessionDataService {
  constructor(
    @InjectRepository(PacketSessionData)
    private sessionsRepository: Repository<PacketSessionData>,
  ) {}

  findAll(): Promise<PacketSessionData[]> {
    return this.sessionsRepository.find();
  }

  findOne(m_sessionUID: string): Promise<PacketSessionData> {
    return this.sessionsRepository.findOneBy({ m_sessionUID });
  }

  async remove(m_sessionUID: number): Promise<void> {
    await this.sessionsRepository.delete(m_sessionUID);
  }

  async save(packetSessionData: PacketSessionData): Promise<PacketSessionData> {
    try {
      return this.sessionsRepository.save(packetSessionData);
    } catch (error) {
      console.log(error);
      console.log('Error guardando sesión');
    }
  }
}
