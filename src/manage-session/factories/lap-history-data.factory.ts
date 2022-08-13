import { Injectable } from '@nestjs/common';
import { LapHistoryData } from '../model/LapHistoryData';
import { PacketSessionHistoryData } from '../dto/PacketSessionHistoryData';

@Injectable()
export class LapHistoryDataFactory {
  toEntity(packetSessionHistoryData: PacketSessionHistoryData): LapHistoryData[] {
    const laps: LapHistoryData[] = [];
    packetSessionHistoryData.m_lapHistoryData.forEach(
      (lap: LapHistoryData, lap_number: number) => {
        if (lap.m_lapTimeInMS) {
          laps.push({
            ...lap,
            m_sessionUID: packetSessionHistoryData.m_header.m_sessionUID,
            m_carIdx: packetSessionHistoryData.m_carIdx,
            lap_number: lap_number + 1,
          });
        }
      },
    );

    return laps;
  }
}
