import { Injectable } from '@nestjs/common';
import { FinalClassificationData } from '../model/ClassificationData';
import { PacketFinalClassificationData } from '../model/PacketFinalClassificationData';
import { ParticipantData } from '../model/ParticipantData';

@Injectable()
export class FinalClassificationDataFactory {
  toEntity(
    packetParticipantsData: PacketFinalClassificationData,
  ): FinalClassificationData[] {
    const results: FinalClassificationData[] = [];
    packetParticipantsData.m_classificationData.forEach(
      (participantDto: FinalClassificationData, index: number) => {
        if (participantDto.m_position) {
          results.push({
            ...participantDto,
            m_sessionUID: packetParticipantsData.m_header.m_sessionUID,
            index_in_session: index,
          });
        }
      },
    );

    return results;
  }
}
