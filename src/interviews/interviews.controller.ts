import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { InterviewsService } from './interviews.service';

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
    async deleteInterview(
        @Param('id') id: string,
    ) {
        return this.interviewsService.delete(id);
    }
}