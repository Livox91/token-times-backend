import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { DraftService } from '../drafts/draft.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
    constructor(private readonly draftService: DraftService) { }

    /**
     * GET /news/published
     * TODO: Implement when PublishedNewsService is available.
     */
    @Get('published')
    async getPublishedNews() {
        // TODO: Implement published news retrieval.
    }

    @Get('drafts')
    async getDraftedNews() {
        return this.draftService.findAll();
    }

    @Patch('redraft')
    async postForRedraft(
        @Body('article_id') articleId: string,
    ) {
        return this.draftService.update(articleId, {
            status: 'redraft',
        });
    }

    @Delete('drafts/:id')
    @UseGuards(JwtAuthGuard)
    async deleteDraft(
        @Param('id') id: string,
    ) {
        return this.draftService.delete(id);
    }
}