import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Article, ArticleDocument } from './entities/article.entity';

@Injectable()
export class ArticlesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Partial<Article>): Promise<ArticleDocument> {
        return this.prisma.article.create({
            data: {
                ...data,
                publish_date: data.publish_date ? new Date(data.publish_date) : new Date(),
                last_fetch: data.last_fetch ? new Date(data.last_fetch) : new Date(),
                tags: data.tags ?? [],
                attachments: (data.attachments ?? []) as any,
                comments: (data.comments ?? []) as any,
            } as any,
        }) as unknown as Promise<ArticleDocument>;
    }

    async createMany(data: Partial<Article>[]): Promise<ArticleDocument[]> {
        await this.prisma.article.createMany({
            data: data.map((item) => ({
                ...item,
                publish_date: item.publish_date ? new Date(item.publish_date) : new Date(),
                last_fetch: item.last_fetch ? new Date(item.last_fetch) : new Date(),
                tags: item.tags ?? [],
                attachments: (item.attachments ?? []) as any,
                comments: (item.comments ?? []) as any,
            })) as any,
            skipDuplicates: true,
        });

        const whereIn = data.filter((x) => x.source).map((x) => x.source as string);
        return this.prisma.article.findMany({
            where: { source: { in: whereIn } },
        }) as unknown as Promise<ArticleDocument[]>;
    }

    async findOne(filter: Partial<Article>) {
        return this.prisma.article.findFirst({
            where: filter as any,
        }) as unknown as Promise<ArticleDocument | null>;
    }

    async findAll(filter: Partial<Article> = {}) {
        return this.prisma.article.findMany({
            where: filter as any,
        }) as unknown as Promise<ArticleDocument[]>;
    }

    async findById(id: string): Promise<ArticleDocument> {
        const article = await this.prisma.article.findUnique({ where: { id } });

        if (!article) {
            throw new NotFoundException(`Article ${id} not found`);
        }

        return article as unknown as ArticleDocument;
    }

    async findLatest(limit = 20): Promise<ArticleDocument[]> {
        return this.prisma.article.findMany({
            orderBy: { publish_date: 'desc' },
            take: limit,
        }) as unknown as Promise<ArticleDocument[]>;
    }

    async findByCategory(category: string): Promise<ArticleDocument[]> {
        return this.prisma.article.findMany({
            where: { tags: { has: category } },
            orderBy: { publish_date: 'desc' },
        }) as unknown as Promise<ArticleDocument[]>;
    }

    async findbyStatus(status: string): Promise<ArticleDocument[]> {
        return this.prisma.article.findMany({
            where: { status },
            orderBy: { publish_date: 'desc' },
        }) as unknown as Promise<ArticleDocument[]>;
    }

    async updateStatus(id: string, status: string): Promise<ArticleDocument> {
        const article = await this.prisma.article.update({
            where: { id },
            data: { status },
        });

        if (!article) {
            throw new NotFoundException(`Article ${id} not found`);
        }
        return article as unknown as ArticleDocument;
    }

    async findBySource(source: string): Promise<ArticleDocument[]> {
        return this.prisma.article.findMany({
            where: { source },
            orderBy: { publish_date: 'desc' },
        }) as unknown as Promise<ArticleDocument[]>;
    }

    async exists(filter: Partial<Article>): Promise<boolean> {
        const count = await this.prisma.article.count({ where: filter as any });
        return count > 0;
    }

    async count(filter: Partial<Article> = {}): Promise<number> {
        return this.prisma.article.count({ where: filter as any });
    }

    async update(id: string, update: Partial<Article>): Promise<ArticleDocument> {
        try {
            const article = await this.prisma.article.update({
                where: { id },
                data: update as any,
            });
            return article as unknown as ArticleDocument;
        } catch {
            throw new NotFoundException(`Article ${id} not found`);
        }
    }

    async upsert(filter: Partial<Article>, data: Partial<Article>): Promise<ArticleDocument> {
        const existing = await this.findOne(filter);
        if (existing?.id) {
            return this.update(existing.id, data);
        }
        return this.create(data);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.article.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Article ${id} not found`);
        }
    }

    async deleteMany(filter: Partial<Article>): Promise<number> {
        const result = await this.prisma.article.deleteMany({ where: filter as any });
        return result.count;
    }
}