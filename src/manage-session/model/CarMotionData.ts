import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_car_motion' })
export class CarMotionData {
  @PrimaryGeneratedColumn('increment')
  public id_car_motion?: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_worldPositionX: number; // World space X position
  @Column()
  m_worldPositionY: number; // World space Y position
  @Column()
  m_worldPositionZ: number; // World space Z position
  @Column()
  m_worldVelocityX: number; // Velocity in world space X
  @Column()
  m_worldVelocityY: number; // Velocity in world space Y
  @Column()
  m_worldVelocityZ: number; // Velocity in world space Z
  @Column()
  m_worldForwardDirX: number; // World space forward X direction (normalised)
  @Column()
  m_worldForwardDirY: number; // World space forward Y direction (normalised)
  @Column()
  m_worldForwardDirZ: number; // World space forward Z direction (normalised)
  @Column()
  m_worldRightDirX: number; // World space right X direction (normalised)
  @Column()
  m_worldRightDirY: number; // World space right Y direction (normalised)
  @Column()
  m_worldRightDirZ: number; // World space right Z direction (normalised)
  @Column()
  m_gForceLateral: number; // Lateral G-Force component
  @Column()
  m_gForceLongitudinal: number; // Longitudinal G-Force component
  @Column()
  m_gForceVertical: number; // Vertical G-Force component
  @Column()
  m_yaw: number; // Yaw angle in radians
  @Column()
  m_pitch: number; // Pitch angle in radians
  @Column()
  m_roll: number; // Roll angle in radians
}
