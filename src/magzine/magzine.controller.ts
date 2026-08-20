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

import { MagzineService } from './magzine.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
    async createMagzine(
        @Body() body: {
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
    @UseGuards(JwtAuthGuard)
    async deleteMagzine(
        @Param('id') id: string,
    ) {
        return this.magzineService.delete(id);
    }
}
