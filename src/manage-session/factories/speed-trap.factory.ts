import { Injectable } from '@nestjs/common';
import { PacketEventData, SpeedTrapDTO } from '../dto/PacketEventData';
import { SpeedTrap } from '../model/SpeedTrap';

@Injectable()
export class SpeedTrapFactory {
  toEntity(packetEventData: PacketEventData): SpeedTrap {
    const speedTrapDTO: SpeedTrapDTO =
      packetEventData.SpeedTrap as SpeedTrapDTO;
    return {
      ...speedTrapDTO,
      m_sessionUID: packetEventData.m_header.m_sessionUID,
      index_in_session: speedTrapDTO.vehicleIdx,
      m_sessionTime: packetEventData.m_header.m_sessionTime,
    };
  }
}
