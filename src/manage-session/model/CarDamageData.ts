import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipantData } from './ParticipantData';

@Entity({ name: 'f1_car_damage' })
export class CarDamageData {
  @PrimaryGeneratedColumn('increment')
  public id_car_damage?: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'index_in_session' })
  index_in_session: number;
  @Column()
  @ManyToOne(() => ParticipantData)
  @JoinColumn({ name: 'm_sessionUID' })
  m_sessionUID: string;
  @Column()
  m_tyresWear: string; // tyres wear separated by commas "BR,BL,FR,FL" ej: "4.22188138961792,4.04522180557251,2.6277763843536377,2.589406728744507"
  @Column()
  m_tyresDamage: string; // tyres damage separated by commas "BR,BL,FR,FL" ej: "4,4,2,2"
  @Column()
  m_brakesDamage: string; // brakes damage separated by commas "BR,BL,FR,FL" ej: "0,0,1,1"
  @Column()
  m_frontLeftWingDamage: number; // Front left wing damage (percentage)
  @Column()
  m_frontRightWingDamage: number; // Front right wing damage (percentage)
  @Column()
  m_rearWingDamage: number; // Rear wing damage (percentage)
  @Column()
  m_floorDamage: number; // Floor damage (percentage)
  @Column()
  m_diffuserDamage: number; // Diffuser damage (percentage)
  @Column()
  m_sidepodDamage: number; // Sidepod damage (percentage)
  @Column()
  m_drsFault: number; // Indicator for DRS fault, 0 = OK, 1 = fault
  @Column()
  m_ersFault: number; // Indicator for ERS fault, 0 = OK, 1 = fault
  @Column()
  m_gearBoxDamage: number; // Gear box damage (percentage)
  @Column()
  m_engineDamage: number; // Engine damage (percentage)
  @Column()
  m_engineMGUHWear: number; // Engine wear MGU-H (percentage)
  @Column()
  m_engineESWear: number; // Engine wear ES (percentage)
  @Column()
  m_engineCEWear: number; // Engine wear CE (percentage)
  @Column()
  m_engineICEWear: number; // Engine wear ICE (percentage)
  @Column()
  m_engineMGUKWear: number; // Engine wear MGU-K (percentage)
  @Column()
  m_engineTCWear: number; // Engine wear TC (percentage)
  @Column()
  m_engineBlown: number; // Engine blown, 0 = OK, 1 = fault
  @Column()
  m_engineSeized: number; // Engine seized, 0 = OK, 1 = fault
}
