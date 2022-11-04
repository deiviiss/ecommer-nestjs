import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? ¿Identificar utilidad?
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger
  if (process.env.NODE_ENV != 'production') {
    // Configuración Swagger en NestJS
    const config = new DocumentBuilder()
      .setTitle('Template API')
      .setDescription('Doc Template API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    // URL API
    SwaggerModule.setup('docs', app, document);
  }

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
