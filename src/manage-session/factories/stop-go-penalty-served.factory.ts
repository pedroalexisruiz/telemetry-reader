import { Injectable } from '@nestjs/common';
import {
  PacketEventData,
  StopGoPenaltyServedDTO,
} from '../dto/PacketEventData';
import { StopGoPenaltyServed } from '../model/StopGoPenaltyServed';

@Injectable()
export class StopGoPenaltyServedFactory {
  toEntity(packetEventData: PacketEventData): StopGoPenaltyServed {
    const stopGoPenaltyServedDTO: StopGoPenaltyServedDTO =
      packetEventData.StopGoPenaltyServed as StopGoPenaltyServedDTO;
    return {
      ...stopGoPenaltyServedDTO,
      m_sessionUID: packetEventData.m_header.m_sessionUID,
      index_in_session: stopGoPenaltyServedDTO.vehicleIdx,
      m_sessionTime: packetEventData.m_header.m_sessionTime,
    };
  }
}
