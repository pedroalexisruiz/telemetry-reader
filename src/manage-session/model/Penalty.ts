import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_penalty' })
export class Penalty {
  @PrimaryGeneratedColumn('increment')
  public id_penalty?: number;
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
  penaltyType: number;
  @Column()
  infringementType: number;
  @Column()
  otherVehicleIdx: number;
  @Column()
  time: number;
  @Column()
  lapNum: number;
  @Column()
  placesGained: number;
}
