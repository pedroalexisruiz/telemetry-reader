import { PacketCarDamageDataParser } from 'f1-22-udp/build/src/parsers/CarDamage/parsers';
import { PacketCarSetupDataParser } from 'f1-22-udp/build/src/parsers/CarSetup/parsers';
import { PacketCarStatusDataParser } from 'f1-22-udp/build/src/parsers/CarStatus/parsers';
import { PacketCarTelemetryDataParser } from 'f1-22-udp/build/src/parsers/CarTelemetry/parsers';
import { PacketEventDataParser } from 'f1-22-udp/build/src/parsers/Event/parsers';
import { PacketFinalClassificationDataParser } from 'f1-22-udp/build/src/parsers/FinalClassification/parsers';
import { PacketLapDataParser } from 'f1-22-udp/build/src/parsers/LapData/parsers';
import { PacketLobbyInfoDataParser } from 'f1-22-udp/build/src/parsers/lobby/parsers';
import { PacketMotionDataParser } from 'f1-22-udp/build/src/parsers/Motion/parsers';
import { PacketParticipantsParser } from 'f1-22-udp/build/src/parsers/Participants/parsers';
import { PacketSessionDataParser } from 'f1-22-udp/build/src/parsers/Session/parsers';
import { PacketSessionHistoryDataParser } from 'f1-22-udp/build/src/parsers/SessionHistory/parsers';

export interface Options {
  port?: number;
  forwardAddresses?: Address[] | undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
  address?: string;
  binaryButtonFlags?: boolean;
}

export interface Address {
  port: number;
  ip?: string;
}

export interface ParsedMessage {
  packetID: string;
  packetData: PacketDataParser;
}

export type PacketDataParser =
  | PacketSessionDataParser
  | PacketMotionDataParser
  | PacketCarDamageDataParser
  | PacketSessionHistoryDataParser
  | PacketLapDataParser
  | PacketEventDataParser
  | PacketParticipantsParser
  | PacketCarSetupDataParser
  | PacketCarTelemetryDataParser
  | PacketCarStatusDataParser
  | PacketFinalClassificationDataParser
  | PacketLobbyInfoDataParser
  | null;

export type F1_2021_UDP_Parser =
  | typeof PacketCarDamageDataParser
  | typeof PacketCarSetupDataParser
  | typeof PacketCarStatusDataParser
  | typeof PacketCarTelemetryDataParser
  | typeof PacketEventDataParser
  | typeof PacketFinalClassificationDataParser
  | typeof PacketLapDataParser
  | typeof PacketLobbyInfoDataParser
  | typeof PacketMotionDataParser
  | typeof PacketParticipantsParser
  | typeof PacketSessionDataParser
  | typeof PacketSessionHistoryDataParser
  | null;

import { PacketHeader } from '../types/PacketHeader';

import { PacketMotionData } from '../types/motion';
import { PacketSessionData } from '../types/session';
import { PacketLapData } from '../types/lapData';
import { PacketEventData } from '../types/event';
import { PacketParticipantsData } from '../types/participants';
import { PacketCarSetupData } from '../types/carSetups';
import { PacketCarTelemetryData } from '../types/carTelemetry';
import { PacketCarStatusData } from '../types/carStatus';
import { PacketFinalClassificationData } from '../types/finalClassification';
import { PacketLobbyInfoData } from '../types/lobbyInfo';
import { PacketCarDamageData } from '../types/carDamage';
import { PacketSessionHistoryData } from '../types/sessionHistory';

export {
  PacketMotionData,
  PacketSessionData,
  PacketLapData,
  PacketEventData,
  PacketParticipantsData,
  PacketCarSetupData,
  PacketCarTelemetryData,
  PacketCarStatusData,
  PacketFinalClassificationData,
  PacketLobbyInfoData,
  PacketCarDamageData,
  PacketSessionHistoryData,
  PacketHeader,
};

export type parsedPackageData =
  | PacketMotionData
  | PacketSessionData
  | PacketLapData
  | PacketEventData
  | PacketParticipantsData
  | PacketCarSetupData
  | PacketCarTelemetryData
  | PacketCarStatusData
  | PacketFinalClassificationData
  | PacketLobbyInfoData
  | PacketCarDamageData
  | PacketSessionHistoryData
  | PacketHeader;
