import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { PublishedNewsService } from './published-news.service';
import { filter } from 'node_modules/cheerio/dist/commonjs/api/traversing';

@Controller('published-news')
export class PublishedNewsController {
    constructor(private readonly publishedNewsService: PublishedNewsService) { }

    @Get()
    async getAllPublishedNews() {
        return this.publishedNewsService.findAll();
    }

    @Get(':id')
    async getPublishedNewsById(
        @Param('id') id: string,
    ) {
        return this.publishedNewsService.findById(id);
    }

    @Post()
    async createPublishedNews(
        @Body() body: {
            title: string;
            article: string;
            summary: string;
            author: string;
            image: string;
            approx_time_to_read: number;
            category: string[];
            tags: string[];
            headlines: string[];
            display_section: string[];
        },
    ) {
        return this.publishedNewsService.create(body);
    }

    @Put(':id')
    async updatePublishedNews(
        @Param('id') id: string,
        @Body() body: Partial<{
            title: string;
            article: string;
            summary: string;
            author: string;
            image: string;
            approx_time_to_read: number;
            category: string[];
            tags: string[];
            view_count: number;
            headlines: string[];
            display_section: string[];
            status: string;
        }>,
    ) {
        return this.publishedNewsService.update(id, body);
    }

    @Delete(':id')
    async deletePublishedNews(
        @Param('id') id: string,
    ) {
        return this.publishedNewsService.delete(id);
    }

    @Post('archive/:id')
    async archivePublishedNews(
        @Param('id') id: string,
    ) {
        return this.publishedNewsService.archive(id);
    }
}
