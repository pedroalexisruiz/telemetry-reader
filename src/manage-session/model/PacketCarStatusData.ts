import { PacketHeader } from './PacketHeader';
import { CarStatusData } from './CarStatusData';

export class PacketCarStatusData {
  m_header: PacketHeader; // Header
  m_carStatusData: CarStatusData[];
}
