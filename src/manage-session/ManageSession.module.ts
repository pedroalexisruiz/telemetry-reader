import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UDPController } from 'src/udp.controller';
import { FinalClassificationDataFactory } from './factories/final-classification-data.factory';
import { ParticipantsDataFactory } from './factories/participants-data.factory';
import { FinalClassificationData } from './model/ClassificationData';
import { PacketSessionData } from './model/PacketSessionData';
import { ParticipantData } from './model/ParticipantData';
import { ClassificationService } from './services/classification.service';
import { PacketSessionDataService } from './services/packetsessiondata.service';
import { ParticipantsService } from './services/participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacketSessionData, ParticipantData, FinalClassificationData])],
  controllers: [UDPController],
  providers: [
    PacketSessionDataService,
    ParticipantsService,
    ParticipantsDataFactory,
    FinalClassificationDataFactory,
    ClassificationService
  ],
})
export class ManageSessionModule {}
