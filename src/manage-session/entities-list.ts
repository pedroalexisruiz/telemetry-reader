import { CarDamageData } from './model/CarDamageData';
import { CarMotionData } from './model/CarMotionData';
import { CarStatusData } from './model/CarStatusData';
import { CarTelemetryData } from './model/CarTelemetryData';
import { FinalClassificationData } from './model/ClassificationData';
import { LapData } from './model/LapData';
import { LapHistoryData } from './model/LapHistoryData';
import { PacketSessionData } from './model/PacketSessionData';
import { ParticipantData } from './model/ParticipantData';

export const ENTITIES = [
  PacketSessionData,
  ParticipantData,
  FinalClassificationData,
  LapHistoryData,
  CarStatusData,
  CarDamageData,
  CarMotionData,
  LapData,
  CarTelemetryData,
];
