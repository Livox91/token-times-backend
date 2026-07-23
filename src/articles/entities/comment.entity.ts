import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

    @Prop({ required: true })
    author!: string;

    @Prop({ required: true })
    text!: string;

    @Prop({ required: true, type: Date })
    created_at!: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);