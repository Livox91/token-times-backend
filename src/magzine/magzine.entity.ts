import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MagzineDocument = HydratedDocument<Magzine>;

@Schema()
export class Magzine {
    @Prop({ required: true, unique: true, index: true })
    id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    cover_img!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    issue_name!: string;

    @Prop({ type: Date, default: Date.now })
    publish_date!: Date;

    @Prop({ required: true })
    file!: string;
}

export const MagzineSchema = SchemaFactory.createForClass(Magzine);
