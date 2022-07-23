import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageSessionController } from 'src/manage-session/manage-session.controller';
import { FinalClassificationDataFactory } from './factories/final-classification-data.factory';
import { LapHistoryDataFactory } from './factories/lap-history-data.factory';
import { ParticipantsDataFactory } from './factories/participants-data.factory';
import { ClassificationService } from './services/classification.service';
import { LapHistoryService } from './services/lap-history.service';
import { PacketSessionDataService } from './services/packetsessiondata.service';
import { ParticipantsService } from './services/participants.service';
import { SessionManager } from './model/sessionManager';
import { DataSource } from 'typeorm';
import { CarStatusDataService } from './services/carstatus.service';
import { CarStatusManager } from './model/CarStatusManager';
import { CarStatusesDataFactory } from './factories/car-status-data.factory';
import { CarDamagesDataFactory } from './factories/car-damage-data.factory';
import { CarDamageDataService } from './services/cardamage.service';
import { CarDamageManager } from './model/CarDamageManager';
import { CarMotionDataFactory } from './factories/car-motion-data.factory';
import { CarMotionDataService } from './services/carmotion.service';
import { CarMotionManager } from './model/CarMotionManager';
import { LapDataFactory } from './factories/lap-data.factory';
import { LapDataService } from './services/lap.service';
import { LapManager } from './model/LapManager';
import { ENTITIES } from './entities-list';
import { CarTelemetryDataService } from './services/car-telemetry.service';
import { CarTelemetryManager } from './model/CarTelemetryManager';
import { CarTelemetryDataFactory } from './factories/car-telemetry-data.factory';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
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
          entities: ENTITIES,
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
    LapHistoryDataFactory,
    ClassificationService,
    LapHistoryService,
    CarStatusDataService,
    CarStatusManager,
    SessionManager,
    CarStatusesDataFactory,
    CarDamagesDataFactory,
    CarDamageDataService,
    CarDamageManager,
    CarMotionDataFactory,
    CarMotionDataService,
    CarMotionManager,
    LapDataFactory,
    LapDataService,
    LapManager,
    CarTelemetryDataFactory,
    CarTelemetryDataService,
    CarTelemetryManager,
  ],
})
export class ManageSessionModule {}
