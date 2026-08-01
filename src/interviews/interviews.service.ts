import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Interviews, InterviewsDocument } from './interviews.entity';

@Injectable()
export class InterviewsService {
    constructor(
        @InjectModel(Interviews.name)
        private readonly interviewsModel: Model<InterviewsDocument>,
    ) { }

    async create(data: Partial<Interviews>): Promise<InterviewsDocument> {
        const interview = new this.interviewsModel(data);
        return interview.save();
    }

    async findAll(): Promise<InterviewsDocument[]> {
        return this.interviewsModel
            .find()
            .sort({ publish_date: -1 })
            .exec();
    }

    async findById(id: string): Promise<InterviewsDocument> {
        const interview = await this.interviewsModel.findOne({ _id: id }).exec();

        if (!interview) {
            throw new NotFoundException(`Interview ${id} not found`);
        }

        return interview;
    }

    async update(
        id: string,
        update: Partial<Interviews>,
    ): Promise<InterviewsDocument> {
        const interview = await this.interviewsModel.findOneAndUpdate(
            { _id: id },
            update,
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!interview) {
            throw new NotFoundException(`Interview ${id} not found`);
        }

        return interview;
    }

    async delete(id: string): Promise<void> {
        const result = await this.interviewsModel.findOneAndDelete({ _id: id }).exec();

        if (!result) {
            throw new NotFoundException(`Interview ${id} not found`);
        }
    }
}