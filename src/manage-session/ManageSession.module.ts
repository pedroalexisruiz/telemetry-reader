import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageSessionController } from 'src/manage-session/manage-session.controller';
import { DataSource } from 'typeorm';
import { ENTITIES } from './entities-list';
import { FACTORIES } from './factories';
import { SERVICES } from './services';
import { MANAGERS } from './model/managers';

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
          name: 'f1Connection',
        });
        return dataSource.initialize();
      },
    },
    ...FACTORIES,
    ...SERVICES,
    ...MANAGERS,
  ],
})
export class ManageSessionModule {}
