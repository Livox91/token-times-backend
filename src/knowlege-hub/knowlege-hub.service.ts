import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KnowlegeHub, KnowlegeHubDocument } from './knowlege-hub.entity';

@Injectable()
export class KnowlegeHubService {
    constructor(
        @InjectModel(KnowlegeHub.name)
        private readonly knowlegeHubModel: Model<KnowlegeHubDocument>,
    ) { }

    async create(data: Partial<KnowlegeHub>): Promise<KnowlegeHubDocument> {
        const knowlegeHub = new this.knowlegeHubModel(data);
        return knowlegeHub.save();
    }

    async findAll(): Promise<KnowlegeHubDocument[]> {
        return this.knowlegeHubModel
            .find()
            .sort({ publish_date: -1 })
            .exec();
    }

    async findById(id: string): Promise<KnowlegeHubDocument> {
        const knowlegeHub = await this.knowlegeHubModel.findOne({ id }).exec();

        if (!knowlegeHub) {
            throw new NotFoundException(`KnowlegeHub ${id} not found`);
        }

        return knowlegeHub;
    }

    async update(
        id: string,
        update: Partial<KnowlegeHub>,
    ): Promise<KnowlegeHubDocument> {
        const knowlegeHub = await this.knowlegeHubModel.findOneAndUpdate(
            { id },
            update,
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!knowlegeHub) {
            throw new NotFoundException(`KnowlegeHub ${id} not found`);
        }

        return knowlegeHub;
    }

    async delete(id: string): Promise<void> {
        const result = await this.knowlegeHubModel.findOneAndDelete({ id }).exec();

        if (!result) {
            throw new NotFoundException(`KnowlegeHub ${id} not found`);
        }
    }
}