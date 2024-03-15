import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {

  static init(app: INestApplication) {
    // swagger default config
    const config = new DocumentBuilder()
      .setTitle('UuEduKit')
      .setDescription('The UuEduKit API Swagger Interface')
      .setVersion('0.2')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    
    // swagger init
    SwaggerModule.setup('api', app, document);
  }

}

 