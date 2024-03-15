import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MainModule } from './modules/main/main.module';
import { CorsMiddleware } from './middleware/cors.middleware';
import { GuardModule } from './modules/guard/guard.module';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [
    MainModule,
    GuardModule
  ],
  controllers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}

// @UseGuards(AuthGuard('jwt'))