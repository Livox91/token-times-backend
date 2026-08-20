import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Events, EventsDocument } from './events.entity';

type EventWritePayload = Partial<Events>;

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: EventWritePayload): Promise<EventsDocument> {
        return this.prisma.events.create({
            data: {
                ...data,
                event_date: new Date(data.event_date),
                event_guests: data.event_guests ?? [],
                event_hosts: data.event_hosts ?? [],
            } as any,
        }) as Promise<EventsDocument>;
    }

    async findAll(): Promise<EventsDocument[]> {
        return this.prisma.events.findMany({
            orderBy: { event_date: 'desc' },
        }) as Promise<EventsDocument[]>;
    }

    async findById(id: string): Promise<EventsDocument> {
        const event = await this.prisma.events.findUnique({ where: { id } });

        if (!event) {
            throw new NotFoundException(`Event ${id} not found`);
        }

        return event as EventsDocument;
    }

    async update(id: string, update: EventWritePayload): Promise<EventsDocument> {
        try {
            return await this.prisma.events.update({
                where: { id },
                data: {
                    ...update,
                    event_guests: update.event_guests ?? undefined,
                    event_hosts: update.event_hosts ?? undefined,
                } as any,
            }) as EventsDocument;
        } catch {
            throw new NotFoundException(`Event ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.events.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Event ${id} not found`);
        }
    }
}