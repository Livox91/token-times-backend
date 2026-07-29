import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchDocument = HydratedDocument<Research>;

@Schema()
export class Research {
    @Prop({ required: true, unique: true, index: true })
    id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    author!: string;

    @Prop({ type: Date, default: Date.now })
    publish_date!: Date;

    @Prop({ required: true })
    file!: string;
}

export const ResearchSchema = SchemaFactory.createForClass(Research);