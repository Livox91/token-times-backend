export type PublishedNewsDocument = PublishedNews;

export class PublishedNews {
    id?: string;
    title!: string;
    summary!: string;
    article!: string;
    author!: string;
    image!: string;
    approx_time_to_read!: number;
    category!: string[];
    tags!: string[];
    view_count!: number;
    headlines!: string[];
    display_section!: string[];
    status!: string;
    createdAt?: Date;
    updatedAt?: Date;
}
