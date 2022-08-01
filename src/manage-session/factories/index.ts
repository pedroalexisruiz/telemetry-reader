import { CarDamagesDataFactory } from './car-damage-data.factory';
import { CarMotionDataFactory } from './car-motion-data.factory';
import { CarStatusesDataFactory } from './car-status-data.factory';
import { CarTelemetryDataFactory } from './car-telemetry-data.factory';
import { DriveThroughPenaltyServedFactory } from './drive-through-penalty-served.factory';
import { FinalClassificationDataFactory } from './final-classification-data.factory';
import { LapDataFactory } from './lap-data.factory';
import { LapHistoryDataFactory } from './lap-history-data.factory';
import { ParticipantsDataFactory } from './participants-data.factory';
import { PenaltyFactory } from './penalty.factory';
import { SpeedTrapFactory } from './speed-trap.factory';
import { StopGoPenaltyServedFactory } from './stop-go-penalty-served.factory';
import { TyreStintHistoryDataFactory } from './tyre-stint-history-data.factory';

export const FACTORIES = [
  ParticipantsDataFactory,
  FinalClassificationDataFactory,
  LapHistoryDataFactory,
  CarStatusesDataFactory,
  CarDamagesDataFactory,
  CarMotionDataFactory,
  LapDataFactory,
  CarTelemetryDataFactory,
  PenaltyFactory,
  SpeedTrapFactory,
  DriveThroughPenaltyServedFactory,
  StopGoPenaltyServedFactory,
  TyreStintHistoryDataFactory
];
