import { Injectable } from '@nestjs/common';
import { CarDamageDataDTO } from '../dto/CarDamageDataDTO';
import { PacketCarDamageData } from '../dto/PacketCarDamageData';
import { CarDamageData } from '../model/CarDamageData';

@Injectable()
export class CarDamagesDataFactory {
  toEntity(packetCarStatussData: PacketCarDamageData): CarDamageData[] {
    return packetCarStatussData.m_carDamageData.map(
      (carStatusDto: CarDamageDataDTO, index_in_session: number) => ({
        ...carStatusDto,
        m_sessionUID: packetCarStatussData.m_header.m_sessionUID,
        index_in_session,
        m_tyresWear: carStatusDto.m_tyresWear.toString(),
        m_tyresDamage: carStatusDto.m_tyresDamage.toString(),
        m_brakesDamage: carStatusDto.m_brakesDamage.toString(),
      }),
    );
  }
}
