import { Injectable } from '@nestjs/common';
import { CarDamageDataDTO } from '../dto/CarDamageDataDTO';
import { PacketCarDamageData } from '../dto/PacketCarDamageData';
import { CarDamageData } from '../model/CarDamageData';

@Injectable()
export class CarDamagesDataFactory {
  toEntity(packetCarDamageData: PacketCarDamageData): CarDamageData[] {
    return packetCarDamageData.m_carDamageData.map(
      (carStatusDto: CarDamageDataDTO, index_in_session: number) => ({
        ...carStatusDto,
        m_sessionUID: packetCarDamageData.m_header.m_sessionUID,
        index_in_session,
        m_tyresWear: carStatusDto.m_tyresWear.toString(),
        m_tyresDamage: carStatusDto.m_tyresDamage.toString(),
        m_brakesDamage: carStatusDto.m_brakesDamage.toString(),
        m_sessionTime: packetCarDamageData.m_header.m_sessionTime,
      }),
    );
  }
}
