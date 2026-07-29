import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Regulation, RegulationDocument } from './regulation.entity';

@Injectable()
export class RegulationService {
    constructor(
        @InjectModel(Regulation.name)
        private readonly regulationModel: Model<RegulationDocument>,
    ) { }

    async create(data: Partial<Regulation>): Promise<RegulationDocument> {
        const regulation = new this.regulationModel(data);
        return regulation.save();
    }

    async findAll(): Promise<RegulationDocument[]> {
        return this.regulationModel
            .find()
            .sort({ publish_date: -1 })
            .exec();
    }

    async findById(id: string): Promise<RegulationDocument> {
        const regulation = await this.regulationModel.findOne({ id }).exec();

        if (!regulation) {
            throw new NotFoundException(`Regulation ${id} not found`);
        }

        return regulation;
    }

    async update(
        id: string,
        update: Partial<Regulation>,
    ): Promise<RegulationDocument> {
        const regulation = await this.regulationModel.findOneAndUpdate(
            { id },
            update,
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!regulation) {
            throw new NotFoundException(`Regulation ${id} not found`);
        }

        return regulation;
    }

    async delete(id: string): Promise<void> {
        const result = await this.regulationModel.findOneAndDelete({ id }).exec();

        if (!result) {
            throw new NotFoundException(`Regulation ${id} not found`);
        }
    }
}
