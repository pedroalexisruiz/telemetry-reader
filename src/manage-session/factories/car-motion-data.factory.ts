import { Injectable } from '@nestjs/common';
import { CarMotionDataDTO } from '../dto/CarMotionDataDTO';
import { PacketMotionData } from '../dto/PacketMotionData';
import { CarMotionData } from '../model/CarMotionData';

@Injectable()
export class CarMotionDataFactory {
  toEntity(packetCarMotionData: PacketMotionData): CarMotionData[] {
    return packetCarMotionData.m_carMotionData.map(
      (carStatusDto: CarMotionDataDTO, index_in_session: number) => ({
        ...carStatusDto,
        m_sessionUID: packetCarMotionData.m_header.m_sessionUID,
        index_in_session,
        m_sessionTime: packetCarMotionData.m_header.m_sessionTime,
      }),
    );
  }
}
