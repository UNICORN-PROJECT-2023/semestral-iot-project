import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {

  static init(app: INestApplication) {
    // swagger default config
    const config = new DocumentBuilder()
      .setTitle('ServerRoomWatch')
      .setDescription('The ServerRoomWatch API Swagger Interface')
      .setVersion('0.2')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    
    // swagger init
    SwaggerModule.setup('api/v1/docs', app, document);
  }

}

 