export type RegulationDocument = Regulation;

export class Regulation {
    id?: string;
    title!: string;
    authority!: string;
    publish_date!: Date;
    file!: string;
}