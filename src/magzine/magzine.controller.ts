import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { MagzineService } from './magzine.service';

@Controller('magzine')
export class MagzineController {
    constructor(private readonly magzineService: MagzineService) { }

    @Get()
    async getAllMagzines() {
        return this.magzineService.findAll();
    }

    @Get(':id')
    async getMagzineById(
        @Param('id') id: string,
    ) {
        return this.magzineService.findById(id);
    }

    @Post()
    async createMagzine(
        @Body() body: {
            id: string;
            title: string;
            cover_img: string;
            description: string;
            price: number;
            issue_name: string;
            publish_date: Date;
            file: string;
        },
    ) {
        return this.magzineService.create(body);
    }

    @Put(':id')
    async updateMagzine(
        @Param('id') id: string,
        @Body() body: Partial<{
            id: string;
            title: string;
            cover_img: string;
            description: string;
            price: number;
            issue_name: string;
            publish_date: Date;
            file: string;
        }>,
    ) {
        return this.magzineService.update(id, body);
    }

    @Delete(':id')
    async deleteMagzine(
        @Param('id') id: string,
    ) {
        return this.magzineService.delete(id);
    }
}
