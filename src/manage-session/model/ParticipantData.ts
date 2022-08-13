import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PacketSessionData } from './PacketSessionData';

@Entity({ name: 'f1_participants' })
@Index(['m_sessionUID', 'index_in_session'], { unique: true })
export class ParticipantData {
  @PrimaryGeneratedColumn('increment')
  public id_participantes?: number;
  @Column()
  index_in_session: number;
  @Column()
  m_name: string; // Name of participant in UTF-8 format – null terminated
  // Will be truncated with … (U+2026) if too long
  @Column()
  @ManyToOne(() => PacketSessionData)
  @JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_aiControlled: number; // Whether the vehicle is AI (1) or Human (0) controlled
  @Column()
  m_driverId: number; // Driver id - see appendix, 255 if network human
  @Column()
  m_networkId: number; // Network id – unique identifier for network players
  @Column()
  m_teamId: number; // Team id - see appendix
  @Column()
  m_myTeam: number; // My team flag – 1 = My Team, 0 = otherwise
  @Column()
  m_raceNumber: number; // Race number of the car
  @Column()
  m_nationality: number; // Nationality of the driver
  @Column()
  m_yourTelemetry: number; // The player's UDP setting, 0 = restricted, 1 = public
}
