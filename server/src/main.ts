import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './config/swagger';
import { Validator } from './config/validator';
import path, { join } from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  // init app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'client/build'));

  // Set global API prefix
  app.setGlobalPrefix('api/v1');

  // init swagger
  Swagger.init(app);

  // init dto validator
  Validator.init(app);

  // Handle React routing, return index.html
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client/build', 'index.html'));
  });

  // start app
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
