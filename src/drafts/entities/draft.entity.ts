import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


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