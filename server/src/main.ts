import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './config/swagger';
import { Validator } from './config/validator';

async function bootstrap() {
  
  // init app
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  
  // init swagger
  Swagger.init(app);

  // init dto validator
  Validator.init(app)

  // start app
  await app.listen(3000);
}
bootstrap();
