import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from '../model/Calendar';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
  ) {}

  findAll(): Promise<Calendar[]> {
    return this.calendarRepository.find();
  }

  findNextEmpty(port: number, m_sessionType: number): Promise<Calendar> {
    return this.calendarRepository.findOneBy({
      is_saved: false,
      port,
      m_sessionType,
    });
  }

  async remove(m_sessionUID: number): Promise<void> {
    await this.calendarRepository.delete(m_sessionUID);
  }

  async save(calendar: Calendar): Promise<Calendar> {
    try {
      return this.calendarRepository.save(calendar);
    } catch (error) {
      console.log(error);
      console.log('Error saving calendar');
    }
  }
}
