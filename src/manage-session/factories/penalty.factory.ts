import { Injectable } from '@nestjs/common';
import { PacketEventData, PenaltyDTO } from '../dto/PacketEventData';
import { Penalty } from '../model/Penalty';

@Injectable()
export class PenaltyFactory {
  toEntity(packetEventData: PacketEventData): Penalty {
    const penaltyDTO: PenaltyDTO = packetEventData.Penalty as PenaltyDTO;
    return {
      ...penaltyDTO,
      m_sessionUID: packetEventData.m_header.m_sessionUID,
      index_in_session: penaltyDTO.vehicleIdx,
      m_sessionTime: packetEventData.m_header.m_sessionTime,
    };
  }
}
