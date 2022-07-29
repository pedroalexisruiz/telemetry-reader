import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_car_telemetry_data' })
export class CarTelemetryData {
  @PrimaryGeneratedColumn('increment')
  public id_car_telemetry_data?: number;
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
  @Column()
  /*uint16*/
  m_speed: number;
  @Column()
  /*float*/
  m_throttle: number;
  @Column()
  /*float*/
  m_steer: number;
  @Column()
  /*float*/
  m_brake: number;
  @Column()
  /*uint8*/
  m_clutch: number;
  @Column()
  /*int8*/
  m_gear: number;
  @Column()
  /*uint16*/
  m_engineRPM: number;
  @Column()
  /*uint8*/
  m_drs: number;
  @Column()
  /*uint8*/
  m_revLightsPercent: number;
  @Column()
  /*uint16*/
  m_revLightsBitValue: number;
  @Column()
  /*uint16*/
  m_brakesTemperature: string;
  @Column()
  /*uint8*/
  m_tyresSurfaceTemperature: string;
  @Column()
  /*uint8*/
  m_tyresInnerTemperature: string;
  @Column()
  /*uint16*/
  m_engineTemperature: number;
  @Column()
  /*float*/
  m_tyresPressure: string;
  @Column()
  /*uint8*/
  m_surfaceType: string;
}
