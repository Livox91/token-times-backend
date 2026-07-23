import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Attachment, AttachmentSchema } from './attachment.entity';
import { Types } from 'mongoose';
import { Comment, CommentSchema } from './comment.entity';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {

    @Prop({ required: true })
    title!: string;

    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    source!: string;

    @Prop({
        required: true,
        type: String,
    })
    content!: string;

    @Prop({
        type: Date,
        default: Date.now,
    })
    publish_date!: Date;

    @Prop({
        type: [String],
        default: [],
    })
    tags!: string[];

    @Prop({
        default: [],
    })
    attachments!: Attachment[];

    @Prop({
        default: [],
    })
    comments!: Comment[];

    @Prop({
        default: "fetched",
    })
    status!: string;

    @Prop({
        default: 0,
    })
    fetch_attempts!: number;

    @Prop({
        default: Date.now,
    })
    last_fetch!: Date;

    @Prop()
    error?: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);