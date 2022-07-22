import { PacketHeader } from '../model/PacketHeader';
import { CarDamageDataDTO } from './CarDamageDataDTO';

export interface PacketCarDamageData {
  m_header: PacketHeader;
  m_carDamageData: CarDamageDataDTO[];
}
