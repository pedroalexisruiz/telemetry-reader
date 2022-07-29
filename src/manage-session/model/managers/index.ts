import { CarDamageManager } from './CarDamageManager';
import { CarMotionManager } from './CarMotionManager';
import { CarStatusManager } from './CarStatusManager';
import { CarTelemetryManager } from './CarTelemetryManager';
import { LapManager } from './LapManager';
import { SessionManager } from './sessionManager';
import { EventManager } from './EventManager';

export const MANAGERS = [
  CarStatusManager,
  SessionManager,
  CarDamageManager,
  CarMotionManager,
  LapManager,
  CarTelemetryManager,
  EventManager,
];
