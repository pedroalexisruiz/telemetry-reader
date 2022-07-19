import { Injectable } from '@nestjs/common';
import { PacketCarStatusData } from '../model/PacketCarStatusData';
import { CarStatusData } from '../model/CarStatusData';

@Injectable()
export class CarStatusesDataFactory {
  toEntity(packetCarStatussData: PacketCarStatusData): CarStatusData[] {
    const carStatuses: CarStatusData[] = [];
    packetCarStatussData.m_carStatusData.forEach(
      (carStatusDto: CarStatusData, index_in_session: number) => {
        carStatuses.push({
          ...carStatusDto,
          m_sessionUID: packetCarStatussData.m_header.m_sessionUID,
          index_in_session,
        });
      },
    );

    return carStatuses;
  }
}
