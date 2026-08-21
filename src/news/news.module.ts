import { Module } from '@nestjs/common';

import { HttpService } from './fetcher/http.service';
import { ExtractorService } from './extractor/extractor.service';
import { CleanerService } from './cleaner/cleaner.service';
import { RSSService } from './rss/rss.service';
import { NewsWriterService } from './news-writer/news-writer.service';
import { HttpModule } from '@nestjs/axios'; // <-- 1. Import HttpModule

import { ArticlesModule } from '../articles/articles.module';
import { DraftModule } from '../drafts/draft.module'; // <-- IMPORT THE MODULE HERE
import { AuthModule } from '../auth/auth.module';
import { NewsScheduler } from './news.scheduler';
import { NewsController } from './news.controller';

@Module({
    imports: [
        HttpModule,
        ArticlesModule,
        DraftModule,
        AuthModule,
    ],
    controllers: [
        NewsController,
    ],
    providers: [
        HttpService,
        ExtractorService,
        CleanerService,
        RSSService,
        NewsWriterService,
        NewsScheduler
    ],
    exports: [RSSService, NewsWriterService, CleanerService, ExtractorService, HttpService],
})
export class NewsModule { }