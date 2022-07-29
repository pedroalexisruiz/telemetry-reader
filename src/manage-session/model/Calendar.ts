import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'f1_calendar' })
export class Calendar {
  @PrimaryColumn()
  id_calendar: number;
  @PrimaryColumn()
  port: number;
  @PrimaryColumn()
  m_sessionType: number;
  @Column()
  is_saved: boolean;
}
