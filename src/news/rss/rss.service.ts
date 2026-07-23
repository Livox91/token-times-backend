import { Injectable, Logger } from '@nestjs/common';
import Parser from 'rss-parser';
import pLimit from 'p-limit';

import { HttpService } from '../fetcher/http.service';
import { ExtractorService } from '../extractor/extractor.service';
import { CleanerService } from '../cleaner/cleaner.service';

import { ArticlesService } from '../../articles/articles.service';

@Injectable()
export class RSSService {
    private readonly logger = new Logger(RSSService.name);

    private readonly parser = new Parser({
        timeout: 10000,
    });

    // Limit concurrent article processing
    private readonly limit = pLimit(5);

    constructor(
        private readonly httpService: HttpService,
        private readonly extractorService: ExtractorService,
        private readonly cleanerService: CleanerService,
        private readonly articlesService: ArticlesService,
    ) { }

    /**
     * Entry point
     */
    async fetchFeeds(feedUrls: string[]): Promise<void> {
        for (const feedUrl of feedUrls) {
            await this.processFeed(feedUrl);
        }
    }

    /**
     * Parse one RSS feed
     */
    private async processFeed(feedUrl: string): Promise<void> {
        try {
            this.logger.log(`Fetching ${feedUrl}`);

            const feed = await this.parser.parseURL(feedUrl);

            const jobs =
                feed.items?.map((item) =>
                    this.limit(() => this.processItem(item)),
                ) ?? [];

            await Promise.all(jobs);

            this.logger.log(
                `${feed.title ?? feedUrl} finished (${jobs.length} items)`,
            );
        } catch (err) {
            this.logger.error(`Failed parsing ${feedUrl}`, err);
        }
    }

    /**
     * Process one RSS item
     */
    private async processItem(item: Parser.Item): Promise<void> {
        if (!item.link) {
            return;
        }

        try {
            //------------------------------------
            // Dedupe
            //------------------------------------

            const exists = await this.articlesService.findOne({
                source: item.link,
            });

            if (exists) {
                return;
            }

            //------------------------------------
            // Download HTML
            //------------------------------------

            const html = await this.httpService.fetchHtml(item.link);

            //------------------------------------
            // Extract
            //------------------------------------

            let content =
                this.extractorService.extract(html);

            //------------------------------------
            // Clean
            //------------------------------------

            content =
                this.cleanerService.clean(content);

            //------------------------------------
            // Fallback to RSS description
            //------------------------------------

            if (content.length < 300) {
                content =
                    item.contentSnippet ??
                    item.content ??
                    '';
            }

            //------------------------------------
            // Save
            //------------------------------------

            await this.articlesService.create({
                title:
                    item.title ??
                    'Untitled',

                source: item.link,

                content,

                publish_date: item.pubDate
                    ? new Date(item.pubDate)
                    : new Date(),

                tags:
                    item.categories ?? [],

                attachments: [],

                comments: [],

                status: 'fetched',

                fetch_attempts: 1,

                last_fetch: new Date(),
            });

            this.logger.log(
                `Saved: ${item.title}`,
            );
        } catch (err) {
            this.logger.warn(
                `Failed: ${item.link}`,
            );

            // Optional:
            // save blocked/failed articles
            // into another collection
        }
    }
}