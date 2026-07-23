import { Injectable, Logger } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';

@Injectable()
export class ExtractorService {
    private readonly logger = new Logger(ExtractorService.name);

    extract(html: string): string {
        try {
            const dom = new JSDOM(html);

            const reader = new Readability(dom.window.document);

            const article = reader.parse();

            if (
                article &&
                article.textContent &&
                article.textContent.length > 500
            ) {
                return article.textContent;
            }

            return this.fallback(html);
        } catch (err) {
            this.logger.warn('Readability failed');

            return this.fallback(html);
        }
    }

    private fallback(html: string): string {
        const $ = cheerio.load(html);

        const selectors = [
            'article',
            '.article-body',
            '.story-body',
            '.entry-content',
            '.post-content',
            '.content',
            'main',
        ];

        for (const selector of selectors) {
            const text = $(selector)
                .text()
                .replace(/\s+/g, ' ')
                .trim();

            if (text.length > 500) {
                return text;
            }
        }

        return $('body')
            .text()
            .replace(/\s+/g, ' ')
            .trim();
    }
}