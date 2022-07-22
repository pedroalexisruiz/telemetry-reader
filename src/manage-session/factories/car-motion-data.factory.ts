import { Injectable } from '@nestjs/common';
import { CarMotionDataDTO } from '../dto/CarMotionDataDTO';
import { PacketMotionData } from '../dto/PacketMotionData';
import { CarMotionData } from '../model/CarMotionData';

@Injectable()
export class CarMotionDataFactory {
  toEntity(packetCarStatussData: PacketMotionData): CarMotionData[] {
    return packetCarStatussData.m_carMotionData.map(
      (carStatusDto: CarMotionDataDTO, index_in_session: number) => ({
        ...carStatusDto,
        m_sessionUID: packetCarStatussData.m_header.m_sessionUID,
        index_in_session,
      }),
    );
  }
}
