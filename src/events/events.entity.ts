export type EventsDocument = Events;

export class Events {
    id?: string;
    event_title!: string;
    event_venue!: string;
    event_adress!: string;
    event_date!: Date;
    event_guests!: string[];
    event_description!: string;
    event_hosts!: string[];
    event_agenda!: string;
    image!: string;
}
