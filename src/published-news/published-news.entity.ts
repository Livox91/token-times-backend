import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PublishedNewsDocument = HydratedDocument<PublishedNews>;

@Schema({ timestamps: true })
export class PublishedNews {
    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    summary!: string;

    @Prop({ required: true })
    article!: string;

    @Prop({ required: true })
    author!: string;

    @Prop({ required: true })
    image!: string;

    @Prop({ required: true })
    approx_time_to_read!: number;

    @Prop({ type: [String], default: [] })
    category!: string[];

    @Prop({ type: [String], default: [] })
    tags!: string[];

    @Prop({ default: 0 })
    view_count!: number;

    @Prop({ type: [String], default: [] })
    headlines!: string[];

    @Prop({ type: [String], default: [] })
    display_section!: string[];

    @Prop({ default: 'active' })
    status!: string;
}

export const PublishedNewsSchema = SchemaFactory.createForClass(PublishedNews);
