import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Regulation, RegulationDocument } from './regulation.entity';

@Injectable()
export class RegulationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<Regulation>): Promise<RegulationDocument> {
        return this.prisma.regulation.create({
            data: {
                ...data,
                publish_date: data.publish_date ? new Date(data.publish_date) : new Date(),
            } as any,
        }) as Promise<RegulationDocument>;
    }

    async findAll(): Promise<RegulationDocument[]> {
        return this.prisma.regulation.findMany({
            orderBy: { publish_date: 'desc' },
        }) as Promise<RegulationDocument[]>;
    }

    async findById(id: string): Promise<RegulationDocument> {
        const regulation = await this.prisma.regulation.findUnique({ where: { id } });

        if (!regulation) {
            throw new NotFoundException(`Regulation ${id} not found`);
        }

        return regulation as RegulationDocument;
    }

    async update(id: string, update: Partial<Regulation>): Promise<RegulationDocument> {
        try {
            return await this.prisma.regulation.update({
                where: { id },
                data: update as any,
            }) as RegulationDocument;
        } catch {
            throw new NotFoundException(`Regulation ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.regulation.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Regulation ${id} not found`);
        }
    }
}
