import { Injectable } from '@nestjs/common';
import { LapDataDTO } from '../dto/LapDataDTO';
import { PacketLapData } from '../dto/PacketLapData';
import { LapData } from '../model/LapData';

@Injectable()
export class LapDataFactory {
  toEntity(packetCarStatussData: PacketLapData): LapData[] {
    return packetCarStatussData.m_lapData.map(
      (lapDataDto: LapDataDTO, index_in_session: number) => ({
        ...lapDataDto,
        m_sessionUID: packetCarStatussData.m_header.m_sessionUID,
        index_in_session,
      }),
    );
  }
}
