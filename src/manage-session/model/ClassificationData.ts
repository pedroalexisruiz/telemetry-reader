import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'resultados' })
@Index(['index_in_session', 'm_sessionUID'], { unique: true })
export class FinalClassificationData {
  @PrimaryColumn()
  @OneToOne(() => ParticipantData)
  @JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @PrimaryColumn()
  @OneToOne(() => ParticipantData)
  @JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_position: number; // Finishing position
  @Column()
  m_numLaps: number; // Number of laps completed
  @Column()
  m_gridPosition: number; // Grid position of the car
  @Column()
  m_points: number; // Number of points scored
  @Column()
  m_numPitStops: number; // Number of pit stops made
  @Column()
  m_resultStatus: number; // Result status - 0 = invalid, 1 = inactive, 2 = active
  // 3 = finished, 4 = didnotfinish, 5 = disqualified
  // 6 = not classified, 7 = retired
  @Column()
  m_bestLapTimeInMS: number; // Best lap time of the session in milliseconds
  @Column()
  m_totalRaceTime: number; // Total race time in seconds without penalties
  @Column()
  m_penaltiesTime: number; // Total penalties accumulated in seconds
  @Column()
  m_numPenalties: number; // Number of penalties applied to this driver
  m_numTyreStints: number; // Number of tyres stints up to maximum
  m_tyreStintsActual: null[]; // Actual tyres used by this driver
  m_tyreStintsVisual: null[]; // Visual tyres used by this driver
  m_tyreStintsEndLaps: null[]; // The lap number stints end on
}
