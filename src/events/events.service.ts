import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Events, EventsDocument } from './events.entity';

type EventWritePayload = Partial<Events>;

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name)
        private readonly eventsModel: Model<EventsDocument>,
    ) { }

    async create(data: EventWritePayload): Promise<EventsDocument> {
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
        const event = await this.eventsModel.findOne({ _id: id }).exec();

        if (!event) {
            throw new NotFoundException(`Event ${id} not found`);
        }

        return event;
    }

    async update(
        id: string,
        update: EventWritePayload,
    ): Promise<EventsDocument> {
        const event = await this.eventsModel.findOneAndUpdate(
            { _id: id },
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
        const result = await this.eventsModel.findOneAndDelete({ _id: id }).exec();

        if (!result) {
            throw new NotFoundException(`Event ${id} not found`);
        }
    }
}