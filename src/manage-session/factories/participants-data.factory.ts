import { Injectable } from '@nestjs/common';
import { PacketParticipantsData } from '../model/PacketParticipantsData';
import { ParticipantData } from '../model/ParticipantData';

@Injectable()
export class ParticipantsDataFactory {
  toEntity(packetParticipantsData: PacketParticipantsData): ParticipantData[] {
    const participants: ParticipantData[] = [];
    packetParticipantsData.m_participants.forEach(
      (participantDto: ParticipantData, index: number) => {
        if (participantDto.m_name) {
          participants.push({
            ...participantDto,
            m_sessionUID: packetParticipantsData.m_header.m_sessionUID,
            index_in_session: index,
          });
        }
      },
    );

    return participants;
  }
}
