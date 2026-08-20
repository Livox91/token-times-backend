export type CommentDocument = Comment;

export class Comment {
    author!: string;
    text!: string;
    created_at!: Date;
}