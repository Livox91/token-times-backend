import { Attachment } from './attachment.entity';
import { Comment } from './comment.entity';

export type ArticleDocument = Article;

export class Article {
    id?: string;
    title!: string;
    source!: string;
    content!: string;
    publish_date!: Date;
    tags!: string[];
    attachments!: Attachment[];
    comments!: Comment[];
    status!: string;
    fetch_attempts!: number;
    last_fetch!: Date;
    error?: string;
}