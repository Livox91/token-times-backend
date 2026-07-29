import { Proppatch } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { prop } from 'node_modules/cheerio/dist/commonjs/api/attributes';


export type DraftDocument = HydratedDocument<Draft>;
@Schema()
export class Draft {
    @Prop({ required: true })
    article_id!: string;

    @Prop({ required: true })
    original_title!: string;

    @Prop({ required: true, type: String })
    article!: string;

    @Prop({ required: true, type: String })
    summary!: string;

    @Prop({ required: true })
    author!: string;

    @Prop({ type: String })
    image!: string;

    @Prop({ type: String })
    aprrox_time_to_read!: string;

    @Prop({ required: true })
    category!: Array<{
        name: string;
    }>;

    @Prop({ required: true })
    tags!: Array<{
        name: string;
    }>;

    @Prop({ required: true })
    views!: number;

    @Prop({ required: true })
    headlines!: Array<{
        headline: string;
    }>;

    @Prop({
        required: true,
        enum: ['draft', 'reviewed', 'published'],
        default: 'draft',
    })
    status!: string;
}



export const DraftSchema = SchemaFactory.createForClass(Draft);