import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { PublishedNews, PublishedNewsDocument } from './published-news.entity';

@Injectable()
export class PublishedNewsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<PublishedNews>): Promise<PublishedNewsDocument> {
        return this.prisma.publishedNews.create({
            data: {
                ...data,
                category: data.category ?? [],
                tags: data.tags ?? [],
                headlines: data.headlines ?? [],
                display_section: data.display_section ?? [],
                view_count: data.view_count ?? 0,
                status: data.status ?? 'published',
            } as any,
        }) as Promise<PublishedNewsDocument>;
    }

    async findAll(): Promise<PublishedNewsDocument[]> {
        return this.prisma.publishedNews.findMany({
            orderBy: { createdAt: 'desc' },
        }) as Promise<PublishedNewsDocument[]>;
    }

    async findById(id: string): Promise<PublishedNewsDocument> {
        const publishedNews = await this.prisma.publishedNews.findUnique({ where: { id } });

        if (!publishedNews) {
            throw new NotFoundException(`Published news ${id} not found`);
        }

        return publishedNews as PublishedNewsDocument;
    }

    async update(id: string, update: Partial<PublishedNews>): Promise<PublishedNewsDocument> {
        try {
            return await this.prisma.publishedNews.update({
                where: { id },
                data: {
                    ...update,
                    category: update.category ?? undefined,
                    tags: update.tags ?? undefined,
                    headlines: update.headlines ?? undefined,
                    display_section: update.display_section ?? undefined,
                } as any,
            }) as PublishedNewsDocument;
        } catch {
            throw new NotFoundException(`Published news ${id} not found`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.publishedNews.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Published news ${id} not found`);
        }
    }

    async archive(id: string): Promise<PublishedNewsDocument> {
        try {
            return await this.prisma.publishedNews.update({
                where: { id },
                data: { status: 'archived' },
            }) as PublishedNewsDocument;
        } catch {
            throw new NotFoundException(`Published news ${id} not found`);
        }
    }
}
