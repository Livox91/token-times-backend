export type DraftDocument = Draft;

export class Draft {
    id?: string;
    original_articleid!: string;
    article!: string;
    summary!: string;
    category!: Array<{ name: string }>;
    tags!: Array<{ name: string }>;
    headlines!: Array<{ headline: string }>;
    status!: string;
}