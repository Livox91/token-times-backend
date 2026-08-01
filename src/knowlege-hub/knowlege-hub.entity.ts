import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KnowlegeHubDocument = HydratedDocument<KnowlegeHub>;

@Schema()
export class KnowlegeHub {
    @Prop({ required: true })
    question!: string;

    @Prop({ required: true })
    answer!: string;

    @Prop({ required: true })
    author!: string;

    @Prop({ type: Date, default: Date.now })
    publish_date!: Date;

    @Prop({ type: [String], default: [] })
    tags!: string[];

    @Prop({ type: [String], default: [] })
    category!: string[];
}

export const KnowlegeHubSchema = SchemaFactory.createForClass(KnowlegeHub);