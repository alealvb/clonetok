import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { text } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(text());

  const docsConfig = new DocumentBuilder()
    .setTitle('CloneTok')
    .setDescription('The CloneTok API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, docsConfig);

  const config = app.get(ConfigService);

  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
