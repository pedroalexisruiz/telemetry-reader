import { Column, Entity } from 'typeorm';

@Entity({ name: 'f1_packet_session_data' })
export class PacketSessionData {
  @Column({ primary: true })
  m_sessionUID: string; // Header
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date?: string;
  @Column()
  m_totalLaps?: number; // Total number of laps in this race
  @Column()
  m_sessionType?: number; // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P
  // 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ
  // 10 = R, 11 = R2, 12 = R3, 13 = Time Trial
  @Column()
  m_trackId?: number; // -1 for unknown, see appendix`
  @Column()
  port: number;
  @Column({ nullable: true })
  id_calendar?: number;
}
