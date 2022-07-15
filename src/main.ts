import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketType, UdpServer } from './server';
import * as compression from 'compression';

async function bootstrap() {
  const hybridAppConfig = {
    host: process.env.UDP_HOST,
    port: parseInt(process.env.UDP_PORT, 10),
  };
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: new UdpServer({
      bindOptions: {
        address: hybridAppConfig.host,
        port: hybridAppConfig.port,
      },
      socketOptions: {
        type: SocketType.UDP4,
      },
    }),
  });
  app.use(compression());

  await app.startAllMicroservices();
  await app.listen(hybridAppConfig.port, hybridAppConfig.host);
}
bootstrap();
