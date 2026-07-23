import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { RSSService } from './rss/rss.service';
import { RSS_FEEDS } from './news.config';
import { NewsWriterService } from './news-writer/news-writer.service';

@Injectable()
export class NewsScheduler {
    private readonly logger = new Logger(NewsScheduler.name);

    constructor(
        private readonly rssService: RSSService,
        private readonly newsWriterService: NewsWriterService,
    ) { }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async syncNews() {
        this.logger.log('Starting RSS sync...');

        await this.rssService.fetchFeeds(RSS_FEEDS);

        this.logger.log('RSS sync completed.');

        await this.newsWriterService.processPendingArticles();
    }
}