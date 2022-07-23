export interface CarTelemetryDataDTO {
  /*uint16*/ m_speed: number;
  /*float*/ m_throttle: number;
  /*float*/ m_steer: number;
  /*float*/ m_brake: number;
  /*uint8*/ m_clutch: number;
  /*int8*/ m_gear: number;
  /*uint16*/ m_engineRPM: number;
  /*uint8*/ m_drs: number;
  /*uint8*/ m_revLightsPercent: number;
  /*uint16*/ m_revLightsBitValue: number;
  /*uint16*/ m_brakesTemperature: [number, number, number, number];
  /*uint8*/ m_tyresSurfaceTemperature: [number, number, number, number];
  /*uint8*/ m_tyresInnerTemperature: [number, number, number, number];
  /*uint16*/ m_engineTemperature: number;
  /*float*/ m_tyresPressure: [number, number, number, number];
  /*uint8*/ m_surfaceType: [number, number, number, number];
}
