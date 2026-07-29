import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { KnowlegeHubService } from './knowlege-hub.service';

@Controller('knowlege-hub')
export class KnowlegeHubController {
    constructor(private readonly knowlegeHubService: KnowlegeHubService) { }

    @Get()
    async getAllKnowlegeHub() {
        return this.knowlegeHubService.findAll();
    }

    @Get(':id')
    async getKnowlegeHubById(
        @Param('id') id: string,
    ) {
        return this.knowlegeHubService.findById(id);
    }

    @Post()
    async createKnowlegeHub(
        @Body() body: {
            id: string;
            question: string;
            answer: string;
            author: string;
            publish_date: Date;
            tags: string[];
            category: string[];
        },
    ) {
        return this.knowlegeHubService.create(body);
    }

    @Put(':id')
    async updateKnowlegeHub(
        @Param('id') id: string,
        @Body() body: Partial<{
            id: string;
            question: string;
            answer: string;
            author: string;
            publish_date: Date;
            tags: string[];
            category: string[];
        }>,
    ) {
        return this.knowlegeHubService.update(id, body);
    }

    @Delete(':id')
    async deleteKnowlegeHub(
        @Param('id') id: string,
    ) {
        return this.knowlegeHubService.delete(id);
    }
}