import { Module } from '@nestjs/common';
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
import { FilesModule } from './files/files.module';
import { PublishedNewsModule } from './published-news/published-news.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    // ScheduleModule.forRoot(),
    HttpModule,
    ArticlesModule, DraftModule, NewsModule, CryptoModule, ForexModule, ResearchModule, RegulationModule, MagzineModule, KnowlegeHubModule, InterviewsModule, EventsModule, FilesModule, PublishedNewsModule, AuthModule
  ],
  providers: [
    AppService
  ],
  controllers: [AppController],
})
export class AppModule { }