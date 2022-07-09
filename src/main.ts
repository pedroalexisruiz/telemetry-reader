import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketType, UdpServer } from './server';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const hybridAppConfig = {
    host: '127.0.0.1',
    port: 20777,
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
  await app.startAllMicroservices();
  await app.listen(hybridAppConfig.port, hybridAppConfig.host);
}
bootstrap();
