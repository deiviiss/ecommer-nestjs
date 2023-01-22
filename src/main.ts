import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
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

  // active - modificar data antes de ser enviada por el controller
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // swagger
  if (process.env.NODE_ENV != 'production') {
    // Configuración Swagger en NestJS
    const config = new DocumentBuilder()
      .setTitle('E-commerce API')
      .setDescription(
        'Esta API ofrece endpoint para crear, ver, actualizar y eliminar clientes, usuarios, órdenes y productos en una tienda en línea, además de buscar y filtrar. Desarrollada con NestJS y TypeORM.',
      )
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
