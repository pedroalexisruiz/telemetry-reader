import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_drive_through_penalty_served' })
export class DriveThroughPenaltyServed {
  @PrimaryGeneratedColumn('increment')
  public id_drive_through_penalty_served?: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_sessionTime: number;
}
