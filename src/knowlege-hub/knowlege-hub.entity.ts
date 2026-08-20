export type KnowlegeHubDocument = KnowlegeHub;

export class KnowlegeHub {
    id?: string;
    question!: string;
    answer!: string;
    author!: string;
    publish_date!: Date;
    tags!: string[];
    category!: string[];
}