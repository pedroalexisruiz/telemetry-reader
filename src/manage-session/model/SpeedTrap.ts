import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_speed_trap' })
export class SpeedTrap {
  @PrimaryGeneratedColumn('increment')
  public id_speed_trap?: number;
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
  speed: number;
  @Column()
  overallFastestInSession: number;
  @Column()
  driverFastestInSession: number;
}
