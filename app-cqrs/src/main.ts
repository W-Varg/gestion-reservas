import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configSwagger, IPackageJson, printServerInitLog } from './common/utils/swagger.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const packageJson = configService.get<IPackageJson>('packageJson')!;

  configSwagger(app, packageJson);

  const port = configService.get<number>('port') || 3001;
  await app.listen(port, '0.0.0.0').then(async () => {
    await printServerInitLog(app, packageJson);
  });
}
bootstrap();
