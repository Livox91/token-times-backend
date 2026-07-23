import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DraftModule } from './drafts/draft.module';
import { NewsModule } from './news/news.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/tokentimes'),
    HttpModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ArticlesModule, DraftModule, NewsModule
  ],
  providers: [
    AppService
  ],
  controllers: [AppController],
})
export class AppModule { }