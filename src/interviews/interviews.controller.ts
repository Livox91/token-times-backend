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

import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('interviews')
export class InterviewsController {
    constructor(private readonly interviewsService: InterviewsService) { }

    @Get()
    async getAllInterviews() {
        return this.interviewsService.findAll();
    }

    @Get(':id')
    async getInterviewById(
        @Param('id') id: string,
    ) {
        return this.interviewsService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createInterview(
        @Body() body: {
            questions: string[];
            answers: string[];
            interviewee_name: string;
            interviewer_name: string;
            interview_title: string;
            interviewee_image: string;
            publish_date: Date;
            tags: string[];
            category: string[];
        },
    ) {
        return this.interviewsService.create(body);
    }

    @Put(':id')
    async updateInterview(
        @Param('id') id: string,
        @Body() body: Partial<{
            questions: string[];
            answers: string[];
            interviewee_name: string;
            interviewer_name: string;
            interview_title: string;
            interviewee_image: string;
            publish_date: Date;
            tags: string[];
            category: string[];
        }>,
    ) {
        return this.interviewsService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteInterview(
        @Param('id') id: string,
    ) {
        return this.interviewsService.delete(id);
    }
}