import { FinalClassificationData } from './ClassificationData';
import { PacketHeader } from './PacketHeader';

export interface PacketFinalClassificationData {
  m_header: PacketHeader; // Header
  m_classificationData: FinalClassificationData[]; //resultados por piloto
}
