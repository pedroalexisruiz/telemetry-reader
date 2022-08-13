import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_lap_history_data' })
@Index(['m_carIdx', 'm_sessionUID', 'lap_number'], { unique: true })
export class LapHistoryData {
  @PrimaryColumn()
  //@ManyToOne(() => ParticipantData)
  //@JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @PrimaryColumn()
  //@ManyToOne(() => ParticipantData)
  //@JoinColumn({ name: 'm_carIdx' })
  m_carIdx: number; // Index of the car this lap data relates to
  @PrimaryColumn()
  lap_number: number; //Lap number
  @Column()
  m_lapTimeInMS: number; // Lap time in milliseconds
  @Column()
  m_sector1TimeInMS: number; // Sector 1 time in milliseconds
  @Column()
  m_sector2TimeInMS: number; // Sector 2 time in milliseconds
  @Column()
  m_sector3TimeInMS: number; // Sector 3 time in milliseconds
  @Column()
  m_lapValidBitFlags: number; // 0x01 bit set-lap valid,      0x02 bit set-sector 1 valid
  // 0x04 bit set-sector 2 valid, 0x08 bit set-sector 3 valid
}
