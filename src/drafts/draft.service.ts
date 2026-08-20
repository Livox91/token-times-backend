import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Draft, DraftDocument } from './entities/draft.entity';

@Injectable()
export class DraftService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<Draft>): Promise<DraftDocument> {
        return this.prisma.draft.create({
            data: {
                ...data,
                category: data.category ?? [],
                tags: data.tags ?? [],
                headlines: data.headlines ?? [],
            } as any,
        }) as Promise<DraftDocument>;
    }

    async createMany(data: Partial<Draft>[]): Promise<DraftDocument[]> {
        await this.prisma.draft.createMany({
            data: data.map((item) => ({
                ...item,
                category: item.category ?? [],
                tags: item.tags ?? [],
                headlines: item.headlines ?? [],
            })) as any,
            skipDuplicates: false,
        });

        return this.prisma.draft.findMany({
            where: { original_articleid: { in: data.filter((d) => d.original_articleid).map((d) => d.original_articleid as string) } },
        }) as Promise<DraftDocument[]>;
    }

    async findAll(): Promise<DraftDocument[]> {
        return this.prisma.draft.findMany({
            orderBy: { id: 'desc' },
        }) as Promise<DraftDocument[]>;
    }

    async findById(id: string): Promise<DraftDocument> {
        const draft = await this.prisma.draft.findUnique({ where: { id } });

        if (!draft) {
            throw new NotFoundException(`Draft ${id} not found`);
        }

        return draft as DraftDocument;
    }

    async findOne(filter: any): Promise<DraftDocument | null> {
        return this.prisma.draft.findFirst({ where: filter as any }) as Promise<DraftDocument | null>;
    }

    async update(id: string, update: Partial<Draft>): Promise<DraftDocument> {
        try {
            return await this.prisma.draft.update({
                where: { id },
                data: update as any,
            }) as DraftDocument;
        } catch {
            throw new NotFoundException(`Draft ${id} not found`);
        }
    }

    async upsert(filter: any, data: Partial<Draft>): Promise<DraftDocument> {
        const existing = await this.findOne(filter);
        if (existing?.id) {
            return this.update(existing.id, data);
        }
        return this.create(data);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.draft.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Draft ${id} not found`);
        }
    }

    async deleteMany(filter: any): Promise<number> {
        const result = await this.prisma.draft.deleteMany({ where: filter as any });
        return result.count;
    }

    async count(filter: any = {}): Promise<number> {
        return this.prisma.draft.count({ where: filter as any });
    }

    async exists(filter: any): Promise<boolean> {
        return (await this.prisma.draft.count({ where: filter as any })) > 0;
    }

    async findLatest(limit = 20): Promise<DraftDocument[]> {
        return this.prisma.draft.findMany({
            take: limit,
            orderBy: { id: 'desc' },
        }) as Promise<DraftDocument[]>;
    }
}