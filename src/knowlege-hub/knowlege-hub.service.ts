import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { KnowlegeHub, KnowlegeHubDocument } from './knowlege-hub.entity';

@Injectable()
export class KnowlegeHubService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<KnowlegeHub>): Promise<KnowlegeHubDocument> {
        return this.prisma.knowlegeHub.create({
            data: {
                ...data,
                publish_date: data.publish_date ? new Date(data.publish_date) : new Date(),
                tags: data.tags ?? [],
                category: data.category ?? [],
            } as any,
        }) as Promise<KnowlegeHubDocument>;
    }

    async findAll(): Promise<KnowlegeHubDocument[]> {
        return this.prisma.knowlegeHub.findMany({
            orderBy: { publish_date: 'desc' },
        }) as Promise<KnowlegeHubDocument[]>;
    }

    async findById(id: string): Promise<KnowlegeHubDocument> {
        const knowlegeHub = await this.prisma.knowlegeHub.findUnique({ where: { id } });

        if (!knowlegeHub) {
            throw new NotFoundException(`KnowlegeHub ${id} not found`);
        }

        return knowlegeHub as KnowlegeHubDocument;
    }

    async update(id: string, update: Partial<KnowlegeHub>): Promise<KnowlegeHubDocument> {
        try {
            return await this.prisma.knowlegeHub.update({
                where: { id },
                data: {
                    ...update,
                    tags: update.tags ?? undefined,
                    category: update.category ?? undefined,
                } as any,
            }) as KnowlegeHubDocument;
        } catch {
            throw new NotFoundException(`KnowlegeHub ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.knowlegeHub.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`KnowlegeHub ${id} not found`);
        }
    }
}