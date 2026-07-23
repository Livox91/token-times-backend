import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Article, ArticleDocument } from './entities/article.entity';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
    ) { }

    async create(data: Partial<Article>): Promise<ArticleDocument> {
        const article = new this.articleModel(data);
        return article.save();
    }

    async createMany(data: Partial<Article>[]): Promise<ArticleDocument[]> {
        return this.articleModel.insertMany(data, {
            ordered: false,
        });
    }

    async findOne(filter: Partial<Article>) {
        return this.articleModel.findOne(filter).lean();
    }

    async findAll(filter: Partial<Article> = {}) {
        return this.articleModel.find(filter).exec();
    }

    async findById(id: string): Promise<ArticleDocument> {
        const article = await this.articleModel.findById(id).exec();

        if (!article) {
            throw new NotFoundException(`Article ${id} not found`);
        }

        return article;
    }

    async findLatest(limit = 20): Promise<ArticleDocument[]> {
        return this.articleModel
            .find()
            .sort({ publishedAt: -1 })
            .limit(limit)
            .exec();
    }

    async findByCategory(category: string): Promise<ArticleDocument[]> {
        return this.articleModel
            .find({ category })
            .sort({ publishedAt: -1 })
            .exec();
    }

    async findbyStatus(status: string): Promise<ArticleDocument[]> {
        return this.articleModel
            .find({ status })
            .sort({ publishedAt: -1 })
            .exec();
    }
    async updateStatus(id: string, status: string): Promise<ArticleDocument> {
        const article = await this.articleModel
            .findByIdAndUpdate(id, { status }, { new: true })
            .exec();

        if (!article) {
            throw new NotFoundException(`Article ${id} not found`);
        }
        return article;
    }

    async findBySource(source: string): Promise<ArticleDocument[]> {
        return this.articleModel
            .find({ source })
            .sort({ publishedAt: -1 })
            .exec();
    }

    async exists(
        filter: Partial<Article>,
    ): Promise<boolean> {
        return !!(await this.articleModel.exists(filter));
    }

    async count(
        filter: Partial<Article> = {},
    ): Promise<number> {
        return this.articleModel.countDocuments(filter);
    }

    async update(
        id: string,
        update: UpdateQuery<ArticleDocument>,
    ): Promise<ArticleDocument> {
        const article = await this.articleModel
            .findByIdAndUpdate(id, update, {
                new: true,
                runValidators: true,
            })
            .exec();

        if (!article) {
            throw new NotFoundException(`Article ${id} not found`);
        }

        return article;
    }

    async upsert(
        filter: Partial<Article>,
        data: Partial<Article>,
    ): Promise<ArticleDocument> {
        return this.articleModel.findOneAndUpdate(
            filter,
            data,
            {
                upsert: true,
                new: true,
                runValidators: true,
            },
        );
    }

    async delete(id: string): Promise<void> {
        const result = await this.articleModel.findByIdAndDelete(id);

        if (!result) {
            throw new NotFoundException(`Article ${id} not found`);
        }
    }

    async deleteMany(
        filter: Partial<Article>,
    ): Promise<number> {
        const result = await this.articleModel.deleteMany(filter);
        return result.deletedCount;
    }
}