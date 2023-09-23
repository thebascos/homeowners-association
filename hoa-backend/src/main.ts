import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './auth/dto/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:4200',
  });
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalFilters(new CustomExceptionFilter());
}
bootstrap();
