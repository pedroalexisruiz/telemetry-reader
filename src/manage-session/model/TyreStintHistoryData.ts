import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_tyre_stint_history_data' })
export class TyreStintHistoryData {
  @PrimaryGeneratedColumn('increment')
  public id_tyre_stint_history_data?: number;
  @Column()
  //@ManyToOne(() => ParticipantData)
  //@JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @Column()
  //@ManyToOne(() => ParticipantData)
  //@JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_endLap: number; // Lap the tyre usage ends on (255 of current tyre)
  @Column()
  m_tyreActualCompound: number; // Actual tyres used by this driver
  @Column()
  m_tyreVisualCompound: number; // Visual tyres used by this driver
}
