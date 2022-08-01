import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LapHistoryData } from '../model/LapHistoryData';
import { LapHistoryDataFactory } from '../factories/lap-history-data.factory';
import { PacketSessionHistoryData } from '../dto/PacketSessionHistoryData';
import { TyreStintHistoryData } from '../model/TyreStintHistoryData';
import { TyreStintHistoryDataFactory } from '../factories/tyre-stint-history-data.factory';

@Injectable()
export class LapHistoryService {
  constructor(
    @InjectRepository(LapHistoryData)
    private lapHistoryRepossitory: Repository<LapHistoryData>,
    @InjectRepository(TyreStintHistoryData)
    private tyreStintRepository: Repository<TyreStintHistoryData>,
    private lapDataFactory: LapHistoryDataFactory,
    private tyreStintDataFactory: TyreStintHistoryDataFactory,
  ) {}

  findAll(): Promise<LapHistoryData[]> {
    return this.lapHistoryRepossitory.find();
  }

  findOne(
    m_carIdx: number,
    m_sessionUID: string,
    lap_number: number,
  ): Promise<LapHistoryData> {
    return this.lapHistoryRepossitory.findOneBy({
      m_carIdx,
      m_sessionUID,
      lap_number,
    });
  }

  async bulkSave(
    sessionsHistoryData: PacketSessionHistoryData[],
  ): Promise<{ laps: LapHistoryData[]; tyreStints: TyreStintHistoryData[] }> {
    let laps: LapHistoryData[] = [];
    let tyreStints: TyreStintHistoryData[] = [];
    sessionsHistoryData.forEach((sessionHistoryPerParticipant) => {
      laps = [
        ...laps,
        ...this.lapDataFactory.toEntity(sessionHistoryPerParticipant),
      ];
      tyreStints = [
        ...tyreStints,
        ...this.tyreStintDataFactory.toEntity(sessionHistoryPerParticipant),
      ];
    });

    try {
      tyreStints = await this.tyreStintRepository.save(tyreStints);
    } catch (error) {
      console.log(error);
      console.log('Error saving tyre stints');
    }

    try {
      laps = await this.lapHistoryRepossitory.save(laps);
    } catch (error) {
      console.log(error);
      console.log('Error saving laps history');
    }

    return { laps, tyreStints };
  }
}
