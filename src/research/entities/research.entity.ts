export type ResearchDocument = Research;

export class Research {
    id?: string;
    title!: string;
    author!: string;
    publish_date!: Date;
    file!: string;
}