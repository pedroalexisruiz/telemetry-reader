import { EventEmitter } from 'events';
import * as constants from './myconstants';
const { PACKETS } = constants;
import { PacketCarDamageDataParser } from 'f1-22-udp/build/src/parsers/CarDamage/parsers';
import { PacketCarSetupDataParser } from 'f1-22-udp/build/src/parsers/CarSetup/parsers';
import { PacketCarStatusDataParser } from 'f1-22-udp/build/src/parsers/CarStatus/parsers';
import { PacketCarTelemetryDataParser } from 'f1-22-udp/build/src/parsers/CarTelemetry/parsers';
import { PacketEventDataParser } from 'f1-22-udp/build/src/parsers/Event/parsers';
import { PacketFinalClassificationDataParser } from 'f1-22-udp/build/src/parsers/FinalClassification/parsers';
import { PacketHeaderParser } from 'f1-22-udp/build/src/parsers/PacketHeader/parser';
import { PacketLapDataParser } from 'f1-22-udp/build/src/parsers/LapData/parsers';
import { PacketLobbyInfoDataParser } from 'f1-22-udp/build/src/parsers/lobby/parsers';
import { PacketMotionDataParser } from 'f1-22-udp/build/src/parsers/Motion/parsers';
import { PacketParticipantsParser } from 'f1-22-udp/build/src/parsers/Participants/parsers';
import { PacketSessionDataParser } from 'f1-22-udp/build/src/parsers/Session/parsers';
import { PacketSessionHistoryDataParser } from 'f1-22-udp/build/src/parsers/SessionHistory/parsers';
import { ParsedMessage, PacketDataParser, F1_2021_UDP_Parser } from './types';
import { PacketHeader } from './manage-session/model/PacketHeader';

class F1TelemetryClient extends EventEmitter {
  /**
   *
   * @param {Buffer} message
   */
  static parseBufferMessage(message: Buffer): ParsedMessage | undefined {
    const header: PacketHeader = F1TelemetryClient.parsePacketHeader(message);
    const { m_packetId } = header as PacketHeader;

    const parser: F1_2021_UDP_Parser =
      F1TelemetryClient.getParserByPacketId(m_packetId);

    if (!parser) {
      return;
    }

    const packetData: PacketDataParser = new parser(message);
    const packetID: string = Object.keys(constants.PACKETS)[m_packetId];

    // emit parsed message

    return { packetData, packetID };
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigIntEnabled
   * @param {Boolean} binaryButtonFlags
   */

  static parsePacketHeader(buffer: Buffer): PacketHeader {
    const packetHeaderParser: PacketHeaderParser = new PacketHeaderParser();
    return packetHeaderParser.fromBuffer(buffer) as PacketHeader;
  }

  /**
   *
   * @param {Number} packetFormat
   * @param {Number} packetId
   */
  static getPacketSize(packetFormat: number, packetId: number): number {
    const { PACKET_SIZES } = constants;
    const packetValues: { [index: number]: number }[] =
      Object.values(PACKET_SIZES);
    return packetValues[packetId][packetFormat];
  }

  /**
   *
   * @param {Number} packetId
   */

  static getParserByPacketId(packetId: number): F1_2021_UDP_Parser {
    const packetKeys: string[] = Object.keys(constants.PACKETS);
    const packetType: string = packetKeys[packetId];

    switch (packetType) {
      case PACKETS.carDamage:
        return PacketCarDamageDataParser;

      case PACKETS.sessionHistory:
        return PacketSessionHistoryDataParser;

      case PACKETS.session:
        return PacketSessionDataParser;

      case PACKETS.motion:
        return PacketMotionDataParser;

      case PACKETS.lapData:
        return PacketLapDataParser;

      case PACKETS.event:
        return PacketEventDataParser;

      case PACKETS.participants:
        return PacketParticipantsParser;

      case PACKETS.carSetups:
        return PacketCarSetupDataParser;

      case PACKETS.carTelemetry:
        return PacketCarTelemetryDataParser;

      case PACKETS.carStatus:
        return PacketCarStatusDataParser;

      case PACKETS.finalClassification:
        return PacketFinalClassificationDataParser;

      case PACKETS.lobbyInfo:
        return PacketLobbyInfoDataParser;

      default:
        return null;
    }
  }
}

export { F1TelemetryClient };
