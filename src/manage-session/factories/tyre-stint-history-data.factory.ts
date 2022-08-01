import { Injectable } from '@nestjs/common';
import { TyreStintHistoryData } from '../model/TyreStintHistoryData';
import { PacketSessionHistoryData } from '../dto/PacketSessionHistoryData';

@Injectable()
export class TyreStintHistoryDataFactory {
  toEntity(
    packetParticipantsData: PacketSessionHistoryData,
  ): TyreStintHistoryData[] {
    const tyreStints: TyreStintHistoryData[] = [];
    packetParticipantsData.m_tyreStintsHistoryData.forEach(
      (tyreStint: TyreStintHistoryData) => {
        tyreStints.push({
          ...tyreStint,
          m_sessionUID: packetParticipantsData.m_header.m_sessionUID,
          index_in_session: packetParticipantsData.m_carIdx,
        });
      },
    );

    return tyreStints;
  }
}
