import { PacketHeader } from '../model/PacketHeader';
import { LapDataDTO } from './LapDataDTO';

export interface PacketLapData {
  m_header: PacketHeader; // PacketHeader
  m_lapData: LapDataDTO[]; // LapData[22]
  m_timeTrialPBCarIdx: number; // uint8
  m_timeTrialRivalCarIdx: number; // uint8
}
