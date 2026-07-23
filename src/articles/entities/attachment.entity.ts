import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttachmentDocument = HydratedDocument<Attachment>;

@Schema()
export class Attachment {
    @Prop({ required: true })
    file_name!: string;

    @Prop({ required: true })
    url!: string;

    @Prop({ required: true })
    type!: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);