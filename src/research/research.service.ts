import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Research, ResearchDocument } from './entities/research.entity';

@Injectable()
export class ResearchService {
    constructor(
        @InjectModel(Research.name)
        private readonly researchModel: Model<ResearchDocument>,
    ) { }

    async create(data: Partial<Research>): Promise<ResearchDocument> {
        const research = new this.researchModel(data);
        return research.save();
    }

    async findAll(): Promise<ResearchDocument[]> {
        return this.researchModel
            .find()
            .sort({ publish_date: -1 })
            .exec();
    }

    async findById(id: string): Promise<ResearchDocument> {
        const research = await this.researchModel.findOne({ _id: id }).exec();

        if (!research) {
            throw new NotFoundException(`Research ${id} not found`);
        }

        return research;
    }

    async update(
        id: string,
        update: Partial<Research>,
    ): Promise<ResearchDocument> {
        const research = await this.researchModel.findOneAndUpdate(
            { _id: id },
            update,
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!research) {
            throw new NotFoundException(`Research ${id} not found`);
        }

        return research;
    }

    async delete(id: string): Promise<void> {
        const result = await this.researchModel.findOneAndDelete({ _id: id }).exec();

        if (!result) {
            throw new NotFoundException(`Research ${id} not found`);
        }
    }
}
