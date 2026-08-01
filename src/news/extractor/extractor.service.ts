import { Injectable, Logger } from '@nestjs/common';


import * as cheerio from 'cheerio';

@Injectable()
export class ExtractorService {
    private readonly logger = new Logger(ExtractorService.name);

    extract(html: string): string {
        return this.fallback(html);
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