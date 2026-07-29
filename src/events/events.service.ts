import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Events, EventsDocument } from './events.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name)
        private readonly eventsModel: Model<EventsDocument>,
    ) { }

    async create(data: Partial<Events>): Promise<EventsDocument> {
        const event = new this.eventsModel(data);
        return event.save();
    }

    async findAll(): Promise<EventsDocument[]> {
        return this.eventsModel
            .find()
            .sort({ event_date: -1 })
            .exec();
    }

    async findById(id: string): Promise<EventsDocument> {
        const event = await this.eventsModel.findOne({ id }).exec();

        if (!event) {
            throw new NotFoundException(`Event ${id} not found`);
        }

        return event;
    }

    async update(
        id: string,
        update: Partial<Events>,
    ): Promise<EventsDocument> {
        const event = await this.eventsModel.findOneAndUpdate(
            { id },
            update,
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!event) {
            throw new NotFoundException(`Event ${id} not found`);
        }

        return event;
    }

    async delete(id: string): Promise<void> {
        const result = await this.eventsModel.findOneAndDelete({ id }).exec();

        if (!result) {
            throw new NotFoundException(`Event ${id} not found`);
        }
    }
}