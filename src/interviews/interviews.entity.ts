import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InterviewsDocument = HydratedDocument<Interviews>;

@Schema()
export class Interviews {
    @Prop({ required: true, unique: true, index: true })
    id!: string;

    @Prop({ type: [String], default: [] })
    questions!: string[];

    @Prop({ type: [String], default: [] })
    answers!: string[];

    @Prop({ required: true })
    interviewee_name!: string;

    @Prop({ required: true })
    interviewer_name!: string;

    @Prop({ required: true })
    interview_title!: string;

    @Prop({ required: true })
    interviewee_image!: string;

    @Prop({ type: Date, default: Date.now })
    publish_date!: Date;

    @Prop({ type: [String], default: [] })
    tags!: string[];

    @Prop({ type: [String], default: [] })
    category!: string[];
}

export const InterviewsSchema = SchemaFactory.createForClass(Interviews);