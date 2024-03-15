import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { jwtSecret } from '../guard/constant/jwt.constant';
import { UserController } from './controllers/user.controller';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { GuardModule } from '../guard/guard.module';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';
import { ArticleListService } from './services/article-list.service';
import { ArticleListController } from './controllers/article-list.controller';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [
    DatabaseModule,
    GuardModule
  ],
  controllers: [UserController, ArticleController, ArticleListController, CategoryController],
  providers: [ UserService, PasswordService, ArticleService, ArticleListService, CategoryService],
  exports: []
})
export class MainModule {}
