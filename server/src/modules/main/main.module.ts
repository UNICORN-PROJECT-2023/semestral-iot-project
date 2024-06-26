import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { jwtSecret } from '../guard/constant/jwt.constant';
import { UserController } from './controllers/user.controller';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { GuardModule } from '../guard/guard.module';
// import { ArticleController } from './controllers/article.controller';
// import { ArticleService } from './services/article.service';
// import { ArticleListService } from './services/article-list.service';
// import { ArticleListController } from './controllers/article-list.controller';
import { WerehouseController } from './controllers/werehouse.controller';
import { WerehouseService } from './services/werehouse.service';
import { CronModule } from '../cron/cron.module';

@Module({
  imports: [
    DatabaseModule,
    GuardModule,
    CronModule,
  ],
  controllers: [UserController, WerehouseController],
  providers: [UserService, PasswordService, WerehouseService],
  exports: []
})
export class MainModule {}
