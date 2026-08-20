import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Magzine, MagzineDocument } from './magzine.entity';

@Injectable()
export class MagzineService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<Magzine>): Promise<MagzineDocument> {
        return this.prisma.magzine.create({
            data: {
                ...data,
                publish_date: new Date(data.publish_date),
            } as any,
        }) as Promise<MagzineDocument>;
    }

    async findAll(): Promise<MagzineDocument[]> {
        return this.prisma.magzine.findMany({
            orderBy: { publish_date: 'desc' },
        }) as Promise<MagzineDocument[]>;
    }

    async findById(id: string): Promise<MagzineDocument> {
        const magzine = await this.prisma.magzine.findUnique({ where: { id } });

        if (!magzine) {
            throw new NotFoundException(`Magzine ${id} not found`);
        }

        return magzine as MagzineDocument;
    }

    async update(id: string, update: Partial<Magzine>): Promise<MagzineDocument> {
        try {
            return await this.prisma.magzine.update({
                where: { id },
                data: update as any,
            }) as MagzineDocument;
        } catch {
            throw new NotFoundException(`Magzine ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.magzine.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Magzine ${id} not found`);
        }
    }
}
