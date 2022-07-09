import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageSessionController } from 'src/udp.controller';
import { FinalClassificationDataFactory } from './factories/final-classification-data.factory';
import { LapDataFactory } from './factories/lap-data.factory';
import { ParticipantsDataFactory } from './factories/participants-data.factory';
import { FinalClassificationData } from './model/ClassificationData';
import { LapData } from './model/LapData';
import { PacketSessionData } from './model/PacketSessionData';
import { ParticipantData } from './model/ParticipantData';
import { ClassificationService } from './services/classification.service';
import { LapService } from './services/lap.service';
import { PacketSessionDataService } from './services/packetsessiondata.service';
import { ParticipantsService } from './services/participants.service';
import { SessionManager } from './model/sessionManager';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PacketSessionData,
      ParticipantData,
      FinalClassificationData,
      LapData,
    ]),
  ],
  controllers: [ManageSessionController],
  providers: [
    PacketSessionDataService,
    ParticipantsService,
    ParticipantsDataFactory,
    FinalClassificationDataFactory,
    LapDataFactory,
    ClassificationService,
    LapService,
    SessionManager
  ],
})
export class ManageSessionModule {}
