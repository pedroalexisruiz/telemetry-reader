import { Injectable } from '@nestjs/common';
import { PacketSessionData } from '../PacketSessionData';
import { PacketCarStatusData } from '../PacketCarStatusData';
import { CarStatusDataService } from '../../services/carstatus.service';
import { CarStatusData } from '../CarStatusData';
import { getSecondsBetweenDates } from 'src/util/timing-utils';
import { CarStatusesDataFactory } from '../../factories/car-status-data.factory';

@Injectable()
export class CarStatusManager {
  _session: PacketSessionData;
  _participantsQuantity: number = 0;
  carStatuses: CarStatusData[] = [];
  lastListeningTime: Date;

  constructor(
    private carStatusDataService: CarStatusDataService,
    private carStatusDataFactory: CarStatusesDataFactory,
  ) {}

  async handlePacket(packetCarStatusData: PacketCarStatusData) {
    const currentDate = new Date();
    const secondsToWaitNextData: number = parseFloat(
      process.env.CAR_STATUS_SAVE_INTERVAL,
    );
    if (
      secondsToWaitNextData > 0 &&
      (!this.lastListeningTime ||
        getSecondsBetweenDates(this.lastListeningTime, currentDate) >=
          secondsToWaitNextData)
    ) {
      const { m_header, m_carStatusData } = packetCarStatusData;
      if (
        this.session &&
        this.participantsQuantity > 0 &&
        this.session.m_sessionUID === m_header.m_sessionUID
      ) {
        const newStatus = this.carStatusDataFactory.toEntity({
          ...packetCarStatusData,
          m_carStatusData: m_carStatusData.slice(0, this.participantsQuantity),
        });
        console.log('Temporarily storing vehicle status', currentDate);
        this.carStatuses = [...this.carStatuses, ...newStatus];
        this.lastListeningTime = currentDate;
      }
    }
  }

  get session(): PacketSessionData {
    return this._session;
  }

  public set session(session: PacketSessionData) {
    this._session = session;
  }

  get participantsQuantity(): number {
    return this._participantsQuantity;
  }

  public set participantsQuantity(participants: number) {
    this._participantsQuantity = participants;
  }

  async saveCarStatus(): Promise<void> {
    console.log(`Guardo ${this.carStatuses.length} status de vehículo`);
    await this.carStatusDataService.saveAll(this.carStatuses);
  }

  resetFlags(): void {
    this.carStatuses = [];
    this.session = null;
    this.participantsQuantity = 0;
  }
}
