import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { ResearchService } from './research.service';

@Controller('research')
export class ResearchController {
    constructor(private readonly researchService: ResearchService) { }

    @Get()
    async getAllResearch() {
        return this.researchService.findAll();
    }

    @Get(':id')
    async getResearchById(
        @Param('id') id: string,
    ) {
        return this.researchService.findById(id);
    }

    @Post()
    async createResearch(
        @Body() body: {
            title: string;
            author: string;
            publish_date: Date;
            file: string;
        },
    ) {
        return this.researchService.create(body);
    }

    @Put(':id')
    async updateResearch(
        @Param('id') id: string,
        @Body() body: Partial<{
            title: string;
            author: string;
            publish_date: Date;
            file: string;
        }>,
    ) {
        return this.researchService.update(id, body);
    }

    @Delete(':id')
    async deleteResearch(
        @Param('id') id: string,
    ) {
        return this.researchService.delete(id);
    }
}
