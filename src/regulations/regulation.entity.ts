import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegulationDocument = HydratedDocument<Regulation>;

@Schema()
export class Regulation {
    @Prop({ required: true, unique: true, index: true })
    id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    authority!: string;

    @Prop({ type: Date, default: Date.now })
    publish_date!: Date;

    @Prop({ required: true })
    file!: string;
}

export const RegulationSchema = SchemaFactory.createForClass(Regulation);