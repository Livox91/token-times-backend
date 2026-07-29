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
import { CryptoModule } from './crypto/crypto.module';
import { ForexModule } from './forex-rates/forex.module';
import { ResearchModule } from './research/research.module';
import { RegulationModule } from './regulations/regulation.module';
import { MagzineModule } from './magzine/magzine.module';
import { KnowlegeHubModule } from './knowlege-hub/knowlege-hub.module';
import { InterviewsModule } from './interviews/interviews.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/tokentimes'),
    HttpModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ArticlesModule, DraftModule, NewsModule, CryptoModule, ForexModule, ResearchModule, RegulationModule, MagzineModule, KnowlegeHubModule, InterviewsModule, EventsModule
  ],
  providers: [
    AppService
  ],
  controllers: [AppController],
})
export class AppModule { }