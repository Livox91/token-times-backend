export type MagzineDocument = Magzine;

export class Magzine {
    id?: string;
    title!: string;
    cover_img!: string;
    description!: string;
    price!: number;
    issue_name!: string;
    publish_date!: Date;
    file!: string;
}
