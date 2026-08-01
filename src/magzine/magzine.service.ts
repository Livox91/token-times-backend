import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Magzine, MagzineDocument } from './magzine.entity';

@Injectable()
export class MagzineService {
    constructor(
        @InjectModel(Magzine.name)
        private readonly magzineModel: Model<MagzineDocument>,
    ) { }

    async create(data: Partial<Magzine>): Promise<MagzineDocument> {
        const magzine = new this.magzineModel(data);
        return magzine.save();
    }

    async findAll(): Promise<MagzineDocument[]> {
        return this.magzineModel
            .find()
            .sort({ publish_date: -1 })
            .exec();
    }

    async findById(id: string): Promise<MagzineDocument> {
        const magzine = await this.magzineModel.findOne({ _id: id }).exec();

        if (!magzine) {
            throw new NotFoundException(`Magzine ${id} not found`);
        }

        return magzine;
    }

    async update(
        id: string,
        update: Partial<Magzine>,
    ): Promise<MagzineDocument> {
        const magzine = await this.magzineModel.findOneAndUpdate(
            { _id: id },
            update,
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!magzine) {
            throw new NotFoundException(`Magzine ${id} not found`);
        }

        return magzine;
    }

    async delete(id: string): Promise<void> {
        const result = await this.magzineModel.findOneAndDelete({ _id: id }).exec();

        if (!result) {
            throw new NotFoundException(`Magzine ${id} not found`);
        }
    }
}
