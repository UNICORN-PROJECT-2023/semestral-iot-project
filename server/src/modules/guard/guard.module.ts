import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constant/jwt.constant';
import { JwtGuard } from './guard/jwt.guard';
import { AppGuard } from './guard/app.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from './service/jwt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [
    JwtService,
    JwtGuard,
      {
        provide: APP_GUARD,
        useClass: AppGuard,
      },
    ],
  exports: [JwtService],
})
export class GuardModule {}