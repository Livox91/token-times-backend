import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Draft, DraftDocument } from './entities/draft.entity';
@Injectable()
export class DraftService {
    constructor(
        @InjectModel(Draft.name)
        private readonly draftModel: Model<DraftDocument>,
    ) { }

    async create(data: Partial<Draft>): Promise<DraftDocument> {
        const draft = new this.draftModel(data);
        return draft.save();
    }

    async createMany(data: Partial<Draft>[]): Promise<DraftDocument[]> {
        return this.draftModel.insertMany(data, {
            ordered: false,
        });
    }

    async findAll(): Promise<DraftDocument[]> {
        return this.draftModel
            .find()
            .sort({ created_at: -1 })
            .exec();
    }

    async findById(id: string): Promise<DraftDocument> {
        const draft = await this.draftModel.findById(id).exec();

        if (!draft) {
            throw new NotFoundException(`Draft ${id} not found`);
        }

        return draft;
    }

    async findOne(filter: any): Promise<DraftDocument | null> {
        return this.draftModel.findOne(filter).exec();
    }

    async update(
        id: string,
        update: Partial<Draft>,
    ): Promise<DraftDocument> {
        const draft = await this.draftModel.findByIdAndUpdate(
            id,
            update,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!draft) {
            throw new NotFoundException(`Draft ${id} not found`);
        }

        return draft;
    }

    async upsert(
        filter: any,
        data: Partial<Draft>,
    ): Promise<DraftDocument> {
        return this.draftModel.findOneAndUpdate(
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
        const result = await this.draftModel.findByIdAndDelete(id);

        if (!result) {
            throw new NotFoundException(`Draft ${id} not found`);
        }
    }

    async deleteMany(filter: any): Promise<number> {
        const result = await this.draftModel.deleteMany(filter);
        return result.deletedCount;
    }

    async count(filter: any = {}): Promise<number> {
        return this.draftModel.countDocuments(filter);
    }

    async exists(filter: any): Promise<boolean> {
        return !!(await this.draftModel.exists(filter));
    }

    async findLatest(limit = 20): Promise<DraftDocument[]> {
        return this.draftModel
            .find()
            .sort({ created_at: -1 })
            .limit(limit)
            .exec();
    }
}