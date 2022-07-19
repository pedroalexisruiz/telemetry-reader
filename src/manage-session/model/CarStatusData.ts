import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_car_status' })
export class CarStatusData {
  @PrimaryGeneratedColumn('increment')
  public id_car_status: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_tractionControl: number; // Traction control - 0 = off, 1 = medium, 2 = full
  @Column()
  m_antiLockBrakes: number; // 0 (off) - 1 (on)
  @Column()
  m_fuelMix: number; // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
  @Column()
  m_frontBrakeBias: number; // Front brake bias (percentage)
  @Column()
  m_pitLimiterStatus: number; // Pit limiter status - 0 = off, 1 = on
  @Column()
  m_fuelInTank: number; // Current fuel mass
  @Column()
  m_fuelCapacity: number; // Fuel capacity
  @Column()
  m_fuelRemainingLaps: number; // Fuel remaining in terms of laps (value on MFD)
  @Column()
  m_maxRPM: number; // Cars max RPM, point of rev limiter
  @Column()
  m_idleRPM: number; // Cars idle RPM
  @Column()
  m_maxGears: number; // Maximum of gears
  @Column()
  m_drsAllowed: number; // 0 = not allowed, 1 = allowed
  @Column()
  m_drsActivationDistance: number; // 0 = DRS not available, non-zero - DRS will be available
  // in [X] metres
  @Column()
  m_actualTyreCompound: number; // F1 Modern - 16 = C5, 17 = C4, 18 = C3, 19 = C2, 20 = C1
  // 7 = inter, 8 = wet
  // F1 Classic - 9 = dry, 10 = wet
  // F2 – 11 = super soft, 12 = soft, 13 = medium, 14 = hard
  // 15 = wet
  @Column()
  m_visualTyreCompound: number; // F1 visual (can be different from actual compound)
  // 16 = soft, 17 = medium, 18 = hard, 7 = inter, 8 = wet
  // F1 Classic – same as above
  // F2 ‘19, 15 = wet, 19 – super soft, 20 = soft
  // 21 = medium , 22 = hard
  @Column()
  m_tyresAgeLaps: number; // Age in laps of the current set of tyres
  @Column()
  m_vehicleFiaFlags: number; // -1 = invalid/unknown, 0 = none, 1 = green
  // 2 = blue, 3 = yellow, 4 = red
  @Column()
  m_ersStoreEnergy: number; // ERS energy store in Joules
  @Column()
  m_ersDeployMode: number; // ERS deployment mode, 0 = none, 1 = medium
  // 2 = hotlap, 3 = overtake
  @Column()
  m_ersHarvestedThisLapMGUK: number; // ERS energy harvested this lap by MGU-K
  @Column()
  m_ersHarvestedThisLapMGUH: number; // ERS energy harvested this lap by MGU-H
  @Column()
  m_ersDeployedThisLap: number; // ERS energy deployed this lap
  @Column()
  m_networkPaused: number; // Whether the car is paused in a network game
}
