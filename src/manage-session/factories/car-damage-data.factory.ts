import { Injectable } from '@nestjs/common';
import { CarDamageDataDTO } from '../dto/CarDamageDataDTO';
import { PacketCarDamageData } from '../dto/PacketCarDamageData';
import { CarDamageData } from '../model/CarDamageData';

@Injectable()
export class CarDamagesDataFactory {
  toEntity(packetCarStatussData: PacketCarDamageData): CarDamageData[] {
    const carDamages: CarDamageData[] = [];
    packetCarStatussData.m_carDamageData.forEach(
      (carStatusDto: CarDamageDataDTO, index_in_session: number) => {
        if (index_in_session === 0) {
          console.log('carStatusDto', carStatusDto);
        }
        carDamages.push({
          ...carStatusDto,
          m_sessionUID: packetCarStatussData.m_header.m_sessionUID,
          index_in_session,
        });
      },
    );

    return carDamages;
  }
}
