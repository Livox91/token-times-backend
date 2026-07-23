import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class CleanerService {
    clean(html: string): string {
        const $ = cheerio.load(html);

        $('script').remove();
        $('style').remove();
        $('noscript').remove();
        $('svg').remove();
        $('iframe').remove();
        $('header').remove();
        $('footer').remove();
        $('nav').remove();
        $('aside').remove();
        $('form').remove();
        $('button').remove();

        let text = $.text();

        text = text
            .replace(/\r/g, '')
            .replace(/\t/g, ' ')
            .replace(/\n{2,}/g, '\n')
            .replace(/[ ]{2,}/g, ' ')
            .replace(/\u00A0/g, ' ')
            .trim();

        return text;
    }
}