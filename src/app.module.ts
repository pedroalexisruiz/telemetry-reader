import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageSessionModule } from './manage-session/ManageSession.module';
import { FinalClassificationData } from './manage-session/model/ClassificationData';
import { PacketSessionData } from './manage-session/model/PacketSessionData';
import { ParticipantData } from './manage-session/model/ParticipantData';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'f1_telemetry',
      entities: [PacketSessionData, ParticipantData, FinalClassificationData],
    }),
    ManageSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
