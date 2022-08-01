import { Injectable } from '@nestjs/common';
import { LapHistoryData } from '../model/LapHistoryData';
import { PacketSessionHistoryData } from '../dto/PacketSessionHistoryData';

@Injectable()
export class LapHistoryDataFactory {
  toEntity(packetParticipantsData: PacketSessionHistoryData): LapHistoryData[] {
    const laps: LapHistoryData[] = [];
    packetParticipantsData.m_lapHistoryData.forEach(
      (lap: LapHistoryData, lap_number: number) => {
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
