import { PacketHeader } from './PacketHeader';
import { ParticipantData } from './ParticipantData';

export interface PacketParticipantsData {
  m_header: PacketHeader; // Header
  m_numActiveCars: number; // Number of active cars in the data – should match number of
  // cars on HUD
  m_participants: ParticipantData[]; //Participantes, llegan 22, en carreras de f1 solo corren 20 por lo que los ultimos 2 llegan con data en null
}
