import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';

import { ResearchService } from './research.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async deleteResearch(
        @Param('id') id: string,
    ) {
        return this.researchService.delete(id);
    }
}
