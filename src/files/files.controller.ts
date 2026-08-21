import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post('upload-url')
    @UseGuards(JwtAuthGuard)
    async createUploadUrl(
        @Body() body: {
            filename: string;
            contentType: string;
            prefix?: string;
        },
    ) {
        return this.filesService.createUploadUrl(body);
    }

    @Post('download-url')
    async createDownloadUrl(
        @Body() body: {
            fileKey: string;
            downloadFilename?: string;
        },
    ) {
        return this.filesService.createDownloadUrl(body);
    }

    @Post('delete-url')
    @UseGuards(JwtAuthGuard)
    async createDeleteUrl(
        @Body() body: {
            fileKey: string;
        },
    ) {
        return this.filesService.createDeleteUrl(body);
    }
}