import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageSessionController } from 'src/manage-session/manage-session.controller';
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
import { DataSource } from 'typeorm';
import { CarStatusData } from './model/CarStatusData';
import { CarStatusDataService } from './services/carstatus.service';
import { CarStatusManager } from './model/CarStatusManager';
import { CarStatusesDataFactory } from './factories/car-status-data.factory';
import { CarDamageData } from './model/CarDamageData';
import { CarDamagesDataFactory } from './factories/car-damage-data.factory';
import { CarDamageDataService } from './services/cardamage.service';
import { CarDamageManager } from './model/CarDamageManager';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PacketSessionData,
      ParticipantData,
      FinalClassificationData,
      LapData,
      CarStatusData,
      CarDamageData,
    ]),
  ],
  controllers: [ManageSessionController],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: process.env.DATABASE_TYPE as any,
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT, 10),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [
            PacketSessionData,
            ParticipantData,
            FinalClassificationData,
            LapData,
            CarStatusData,
            CarDamageData,
          ],
          synchronize: false,
          name: 'assetoCorsaConnection',
        });
        return dataSource.initialize();
      },
    },
    PacketSessionDataService,
    ParticipantsService,
    ParticipantsDataFactory,
    FinalClassificationDataFactory,
    LapDataFactory,
    ClassificationService,
    LapService,
    CarStatusDataService,
    CarStatusManager,
    SessionManager,
    CarStatusesDataFactory,
    CarDamagesDataFactory,
    CarDamageDataService,
    CarDamageManager,
  ],
})
export class ManageSessionModule {}
