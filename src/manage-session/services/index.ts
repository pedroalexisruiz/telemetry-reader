import { CarTelemetryDataService } from './car-telemetry.service';
import { CarDamageDataService } from './cardamage.service';
import { CarMotionDataService } from './carmotion.service';
import { CarStatusDataService } from './carstatus.service';
import { ClassificationService } from './classification.service';
import { DriveThroughPenaltyServedService } from './drive-through-penalty-served.service';
import { LapHistoryService } from './lap-history.service';
import { LapDataService } from './lap.service';
import { PacketSessionDataService } from './packetsessiondata.service';
import { ParticipantsService } from './participants.service';
import { PenaltyService } from './penalty.service';
import { SpeedTrapService } from './speed-trap.service';
import { StopGoPenaltyServedService } from './stop-go-penalty-served.service';

export const SERVICES = [
  PacketSessionDataService,
  ParticipantsService,
  ClassificationService,
  LapHistoryService,
  CarStatusDataService,
  CarDamageDataService,
  CarMotionDataService,
  LapDataService,
  CarTelemetryDataService,
  PenaltyService,
  SpeedTrapService,
  DriveThroughPenaltyServedService,
  StopGoPenaltyServedService,
];
