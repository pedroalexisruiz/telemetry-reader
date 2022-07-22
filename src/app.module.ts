import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ManageSessionModule } from './manage-session/ManageSession.module';
import { FinalClassificationData } from './manage-session/model/ClassificationData';
import { LapData } from './manage-session/model/LapData';
import { PacketSessionData } from './manage-session/model/PacketSessionData';
import { ParticipantData } from './manage-session/model/ParticipantData';
import { CarStatusData } from './manage-session/model/CarStatusData';
import { CarDamageData } from './manage-session/model/CarDamageData';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
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
        CarDamageData
      ],
    }),
    ManageSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
