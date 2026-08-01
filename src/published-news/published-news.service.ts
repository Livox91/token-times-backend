import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PublishedNews, PublishedNewsDocument } from './published-news.entity';

@Injectable()
export class PublishedNewsService {
    constructor(
        @InjectModel(PublishedNews.name)
        private readonly publishedNewsModel: Model<PublishedNewsDocument>,
    ) { }

    async create(data: Partial<PublishedNews>): Promise<PublishedNewsDocument> {
        const publishedNews = new this.publishedNewsModel(data);
        return publishedNews.save();
    }

    async findAll(): Promise<PublishedNewsDocument[]> {
        return this.publishedNewsModel
            .find()
            .sort({ createdAt: -1 })
            .exec();
    }

    async findById(id: string): Promise<PublishedNewsDocument> {
        const publishedNews = await this.publishedNewsModel.findOne({ _id: id }).exec();

        if (!publishedNews) {
            throw new NotFoundException(`Published news ${id} not found`);
        }

        return publishedNews;
    }

    async update(
        id: string,
        update: Partial<PublishedNews>,
    ): Promise<PublishedNewsDocument> {
        const publishedNews = await this.publishedNewsModel.findOneAndUpdate(
            { _id: id },
            update,
            {
                returnDocument: 'after',
                runValidators: true,
            },
        ).exec();

        if (!publishedNews) {
            throw new NotFoundException(`Published news ${id} not found`);
        }

        return publishedNews;
    }

    async delete(id: string): Promise<void> {
        const result = await this.publishedNewsModel.findOneAndDelete({ _id: id }).exec();

        if (!result) {
            throw new NotFoundException(`Published news ${id} not found`);
        }
    }

    async archive(id: string): Promise<PublishedNewsDocument> {
        const publishedNews = await this.publishedNewsModel
            .findOneAndUpdate(
                { _id: id },
                { status: 'archived' },
                {
                    returnDocument: 'after',
                    runValidators: true,
                },
            )
            .exec();

        if (!publishedNews) {
            throw new NotFoundException(`Published news ${id} not found`);
        }

        return publishedNews;
    }


}
