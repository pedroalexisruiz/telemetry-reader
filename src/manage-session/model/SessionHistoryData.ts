import { LapData } from './LapData';
import { PacketHeader } from './PacketHeader';
import { TyreStintHistoryData } from './TyreStintHistoryData';

export interface SessionHistoryData {
  m_header: PacketHeader;
  m_carIdx: number; // Index of the car this lap data relates to
  m_numLaps: number; // Num laps in the data (including current partial lap)
  m_numTyreStints: number; // Number of tyre stints in the data
  m_bestLapTimeLapNum: number; // Lap the best lap time was achieved on
  m_bestSector1LapNum: number; // Lap the best Sector 1 time was achieved on
  m_bestSector2LapNum: number; // Lap the best Sector 2 time was achieved on
  m_bestSector3LapNum: number; // Lap the best Sector 3 time was achieved on
  m_lapHistoryData: Array<LapData | null[]>;
  m_tyreStintsHistoryData: Array<TyreStintHistoryData | null[]>;
}
