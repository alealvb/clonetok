import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docsConfig = new DocumentBuilder()
    .setTitle('CloneTok')
    .setDescription('The CloneTok API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, docsConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
