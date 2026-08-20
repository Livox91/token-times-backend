import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Interviews, InterviewsDocument } from './interviews.entity';

@Injectable()
export class InterviewsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<Interviews>): Promise<InterviewsDocument> {
        return this.prisma.interviews.create({
            data: {
                ...data,
                publish_date: data.publish_date ? new Date(data.publish_date) : new Date(),
                questions: data.questions ?? [],
                answers: data.answers ?? [],
                tags: data.tags ?? [],
                category: data.category ?? [],
            } as any,
        }) as Promise<InterviewsDocument>;
    }

    async findAll(): Promise<InterviewsDocument[]> {
        return this.prisma.interviews.findMany({
            orderBy: { publish_date: 'desc' },
        }) as Promise<InterviewsDocument[]>;
    }

    async findById(id: string): Promise<InterviewsDocument> {
        const interview = await this.prisma.interviews.findUnique({ where: { id } });

        if (!interview) {
            throw new NotFoundException(`Interview ${id} not found`);
        }

        return interview as InterviewsDocument;
    }

    async update(id: string, update: Partial<Interviews>): Promise<InterviewsDocument> {
        try {
            return await this.prisma.interviews.update({
                where: { id },
                data: {
                    ...update,
                    questions: update.questions ?? undefined,
                    answers: update.answers ?? undefined,
                    tags: update.tags ?? undefined,
                    category: update.category ?? undefined,
                } as any,
            }) as InterviewsDocument;
        } catch {
            throw new NotFoundException(`Interview ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.interviews.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Interview ${id} not found`);
        }
    }
}