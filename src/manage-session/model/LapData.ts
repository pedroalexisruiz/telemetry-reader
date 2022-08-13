import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_lap_data' })
export class LapData {
  @PrimaryGeneratedColumn('increment')
  public id_lap_data?: number;
  @Column()
  //@ManyToOne(() => ParticipantData)
  //@JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @Column()
  //@ManyToOne(() => ParticipantData)
  //@JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_sessionTime: number;
  @Column()
  m_lastLapTimeInMS: number; // uint32le
  @Column()
  m_currentLapTimeInMS: number; // uint32le
  @Column()
  m_sector1TimeInMS: number; // uint16le
  @Column()
  m_sector2TimeInMS: number; // uint16le
  @Column()
  m_lapDistance: number; // floatle
  @Column()
  m_totalDistance: number; // floatle
  @Column()
  m_safetyCarDelta: number; // floatle
  @Column()
  m_carPosition: number; // uint8
  @Column()
  m_currentLapNum: number; // uint8
  @Column()
  m_pitStatus: number; // uint8
  @Column()
  m_numPitStops: number; // uint8
  @Column()
  m_sector: number; // uint8
  @Column()
  m_currentLapInvalid: number; // uint8
  @Column()
  m_penalties: number; // uint8
  @Column()
  m_warnings: number; // uint8
  @Column()
  m_numUnservedDriveThroughPens: number; // uint8
  @Column()
  m_numUnservedStopGoPens: number; // uint8
  @Column()
  m_gridPosition: number; // uint8
  @Column()
  m_driverStatus: number; // uint8
  @Column()
  m_resultStatus: number; // uint8
  @Column()
  m_pitLaneTimerActive: number; // uint8
  @Column()
  m_pitLaneTimeInLaneInMS: number; // uint16le
  @Column()
  m_pitStopTimerInMS: number; // uint16le
  @Column()
  m_pitStopShouldServePen: number; // uint8
}
