import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { DraftService } from '../../drafts/draft.service';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class NewsWriterService {
    private readonly logger = new Logger(NewsWriterService.name);
    // Prevents cron jobs from overlapping if the AI takes too long
    private isProcessing = false;

    constructor(
        private readonly articlesService: ArticlesService,
        private readonly draftsService: DraftService,
        private readonly httpService: HttpService,
    ) { }

    // Wakes up every minute to check for new fetched articles
    async processPendingArticles(): Promise<void> {
        if (this.isProcessing) {
            this.logger.log('Previous batch is still processing with the AI. Skipping this cycle...');
            return;
        }

        this.isProcessing = true;

        try {
            // Fetch articles waiting to be processed
            const articles = await this.articlesService.findbyStatus('fetched');

            if (articles.length > 0) {
                this.logger.log(`Found ${articles.length} articles to process.`);
            }

            for (const article of articles) {
                await this.processSingleArticle(article);
            }
        } catch (error) {
            this.logger.error('Error fetching articles from database', error);
        } finally {
            // Release the lock when the batch is done
            this.isProcessing = false;
        }
    }

    private async processSingleArticle(article: any): Promise<void> {
        try {
            this.logger.log(`Sending ${article._id} to Python AI Agent...`);

            // Send article to the local Python FastAPI wrapper
            const { data } = await firstValueFrom(
                this.httpService.post(
                    'http://localhost:8888/process',
                    {
                        articleId: article._id,
                        title: article.title,
                        source: article.source,
                        content: article.content,
                        publishDate: article.publish_date,
                        tags: article.tags,
                    },
                ),
            );

            console.log('Received response from Python AI Agent:', data);

            await this.draftsService.create({
                original_articleid: article._id,
                summary: data.summary,
                article: data.article,
                headlines: data.headlines, // <-- Using the sanitized data
                category: data.category,
                tags: data.tags,
                status: 'draft',
            });

            // Update original article status so we don't process it again
            await this.articlesService.updateStatus(article._id.toString(), 'processed');

            this.logger.log(`Successfully processed and drafted: ${article._id}`);
        } catch (err) {
            // If one article fails (e.g., Python server timeout), we log it and continue to the next one
            this.logger.error(`Failed to process article: ${article._id}`, err);
        }
    }
}