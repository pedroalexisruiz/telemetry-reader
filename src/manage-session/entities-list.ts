import { Calendar } from './model/Calendar';
import { CarDamageData } from './model/CarDamageData';
import { CarMotionData } from './model/CarMotionData';
import { CarStatusData } from './model/CarStatusData';
import { CarTelemetryData } from './model/CarTelemetryData';
import { FinalClassificationData } from './model/ClassificationData';
import { DriveThroughPenaltyServed } from './model/DriveThroughPenaltyServed';
import { LapData } from './model/LapData';
import { LapHistoryData } from './model/LapHistoryData';
import { PacketSessionData } from './model/PacketSessionData';
import { ParticipantData } from './model/ParticipantData';
import { Penalty } from './model/Penalty';
import { SpeedTrap } from './model/SpeedTrap';
import { StopGoPenaltyServed } from './model/StopGoPenaltyServed';
import { TyreStintHistoryData } from './model/TyreStintHistoryData';

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
  DriveThroughPenaltyServed,
  StopGoPenaltyServed,
  Penalty,
  SpeedTrap,
  Calendar,
  TyreStintHistoryData
];
