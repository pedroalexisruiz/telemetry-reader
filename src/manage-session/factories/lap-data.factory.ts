import { Injectable } from '@nestjs/common';
import { LapData } from '../model/LapData';
import { PacketSessionHistoryData } from '../model/PacketSessionHistoryData';

@Injectable()
export class LapDataFactory {
  toEntity(packetParticipantsData: PacketSessionHistoryData): LapData[] {
    const laps: LapData[] = [];
    packetParticipantsData.m_lapHistoryData.forEach(
      (lap: LapData, lap_number: number) => {
        if (lap.m_lapTimeInMS) {
          laps.push({
            ...lap,
            m_sessionUID: packetParticipantsData.m_header.m_sessionUID,
            m_carIdx: packetParticipantsData.m_carIdx,
            lap_number: lap_number + 1,
          });
        }
      },
    );

    return laps;
  }
}
