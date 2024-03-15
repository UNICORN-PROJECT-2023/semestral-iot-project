import { INestApplication, ValidationPipe } from '@nestjs/common';

export class Validator {

  static init(app: INestApplication) {
    // setup auto validator
    app.useGlobalPipes(new ValidationPipe());
  }

}

 