import { Injectable } from '@nestjs/common';
import { CarTelemetryDataDTO } from '../dto/CarTelemetryDataDTO';
import { PacketCarTelemetryData } from '../dto/PacketCarTelemetryData';
import { CarTelemetryData } from '../model/CarTelemetryData';

@Injectable()
export class CarTelemetryDataFactory {
  toEntity(packetCarTelemetryData: PacketCarTelemetryData): CarTelemetryData[] {
    return packetCarTelemetryData.m_carTelemetryData.map(
      (carTelemetryDTO: CarTelemetryDataDTO, index_in_session: number) => ({
        ...carTelemetryDTO,
        m_sessionUID: packetCarTelemetryData.m_header.m_sessionUID,
        index_in_session,
        m_brakesTemperature: carTelemetryDTO.m_brakesTemperature.toString(),
        m_tyresSurfaceTemperature:
          carTelemetryDTO.m_tyresSurfaceTemperature.toString(),
        m_tyresInnerTemperature:
          carTelemetryDTO.m_tyresInnerTemperature.toString(),
        m_tyresPressure: carTelemetryDTO.m_tyresPressure.toString(),
        m_surfaceType: carTelemetryDTO.m_surfaceType.toString(),
        m_sessionTime: packetCarTelemetryData.m_header.m_sessionTime,
      }),
    );
  }
}
