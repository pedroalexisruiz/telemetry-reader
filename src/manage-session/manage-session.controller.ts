import { Controller } from '@nestjs/common';
import { Ctx, Payload } from '@nestjs/microservices';
import { F1TelemetryClient } from '../client';
import { IncomingMessage, UDPGateWay } from '../decorators';
import { SessionManager } from './model/sessionManager';
import { UdpContext } from '../server';
import { ParsedMessage } from '../types';

@UDPGateWay()
@Controller()
export class ManageSessionController {
  constructor(private sessionManager: SessionManager) {}

  @IncomingMessage()
  public async message(@Payload() data, @Ctx() ctx: UdpContext) {
    const parsedMsg: ParsedMessage | undefined =
      F1TelemetryClient.parseBufferMessage(data);
    if (parsedMsg) {
      await this.sessionManager.handlePacket(parsedMsg);
    }
    return data;
  }
}
