import { Injectable } from '@nestjs/common';
import {
  PacketEventData,
  DriveThroughPenaltyServedDTO,
} from '../dto/PacketEventData';
import { DriveThroughPenaltyServed } from '../model/DriveThroughPenaltyServed';

@Injectable()
export class DriveThroughPenaltyServedFactory {
  toEntity(packetEventData: PacketEventData): DriveThroughPenaltyServed {
    const driveThroughPenaltyServedDTO: DriveThroughPenaltyServedDTO =
      packetEventData.DriveThroughPenaltyServed as DriveThroughPenaltyServedDTO;
    return {
      ...driveThroughPenaltyServedDTO,
      m_sessionUID: packetEventData.m_header.m_sessionUID,
      index_in_session: driveThroughPenaltyServedDTO.vehicleIdx,
      m_sessionTime: packetEventData.m_header.m_sessionTime,
    };
  }
}
