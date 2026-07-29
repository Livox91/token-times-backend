import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { RegulationService } from './regulation.service';

@Controller('regulation')
export class RegulationController {
    constructor(private readonly regulationService: RegulationService) { }

    @Get()
    async getAllRegulations() {
        return this.regulationService.findAll();
    }

    @Get(':id')
    async getRegulationById(
        @Param('id') id: string,
    ) {
        return this.regulationService.findById(id);
    }

    @Post()
    async createRegulation(
        @Body() body: {
            id: string;
            title: string;
            authority: string;
            publish_date: Date;
            file: string;
        },
    ) {
        return this.regulationService.create(body);
    }

    @Put(':id')
    async updateRegulation(
        @Param('id') id: string,
        @Body() body: Partial<{
            id: string;
            title: string;
            authority: string;
            publish_date: Date;
            file: string;
        }>,
    ) {
        return this.regulationService.update(id, body);
    }

    @Delete(':id')
    async deleteRegulation(
        @Param('id') id: string,
    ) {
        return this.regulationService.delete(id);
    }
}
