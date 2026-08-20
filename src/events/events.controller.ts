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

import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    async getAllEvents() {
        return this.eventsService.findAll();
    }

    @Get(':id')
    async getEventById(
        @Param('id') id: string,
    ) {
        return this.eventsService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createEvent(
        @Body() body: {
            event_title: string;
            event_venue: string;
            event_adress: string;
            event_date: Date;
            event_guests: string[];
            event_description: string;
            event_hosts: string[];
            event_agenda: string;
            image: string;
        },
    ) {
        return this.eventsService.create(body);
    }

    @Put(':id')
    async updateEvent(
        @Param('id') id: string,
        @Body() body: Partial<{
            event_title: string;
            event_venue: string;
            event_adress: string;
            event_date: Date;
            event_guests: string[];
            event_description: string;
            event_hosts: string[];
            event_agenda: string;
            image: string;
        }>,
    ) {
        return this.eventsService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteEvent(
        @Param('id') id: string,
    ) {
        return this.eventsService.delete(id);
    }
}