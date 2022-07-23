import { PacketHeader } from '../model/PacketHeader';
import { CarTelemetryDataDTO } from './CarTelemetryDataDTO';

export interface PacketCarTelemetryData {
  m_header: PacketHeader;
  m_buttonStatus: number;
  m_carTelemetryData: CarTelemetryDataDTO[];
  m_mfdPanelIndex: number;
  m_mfdPanelIndexSecondaryPlayer: number;
  m_suggestedGear: number;
}
