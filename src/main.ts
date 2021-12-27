import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ApiConfigService);
  const port = configService.appConfig.port;

  if (configService.documentationEnabled) {
    configSwagger(app);
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
