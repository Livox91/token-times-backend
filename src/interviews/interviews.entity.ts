export type InterviewsDocument = Interviews;

export class Interviews {
    id?: string;
    questions!: string[];
    answers!: string[];
    interviewee_name!: string;
    interviewer_name!: string;
    interview_title!: string;
    interviewee_image!: string;
    publish_date!: Date;
    tags!: string[];
    category!: string[];
}