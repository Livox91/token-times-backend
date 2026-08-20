import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Research, ResearchDocument } from './entities/research.entity';

@Injectable()
export class ResearchService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<Research>): Promise<ResearchDocument> {
        return this.prisma.research.create({
            data: {
                ...data,
                publish_date: data.publish_date ? new Date(data.publish_date) : new Date(),
            } as any,
        }) as Promise<ResearchDocument>;
    }

    async findAll(): Promise<ResearchDocument[]> {
        return this.prisma.research.findMany({
            orderBy: { publish_date: 'desc' },
        }) as Promise<ResearchDocument[]>;
    }

    async findById(id: string): Promise<ResearchDocument> {
        const research = await this.prisma.research.findUnique({ where: { id } });

        if (!research) {
            throw new NotFoundException(`Research ${id} not found`);
        }

        return research as ResearchDocument;
    }

    async update(id: string, update: Partial<Research>): Promise<ResearchDocument> {
        try {
            return await this.prisma.research.update({
                where: { id },
                data: update as any,
            }) as ResearchDocument;
        } catch {
            throw new NotFoundException(`Research ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.research.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Research ${id} not found`);
        }
    }
}
