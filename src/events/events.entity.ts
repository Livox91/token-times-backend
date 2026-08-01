import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventsDocument = HydratedDocument<Events>;

@Schema()
export class Events {
    @Prop({ required: true })
    event_title!: string;

    @Prop({ required: true })
    event_venue!: string;

    @Prop({ required: true })
    event_adress!: string;

    @Prop({ type: Date, required: true })
    event_date!: Date;

    @Prop({ type: [String], default: [] })
    event_guests!: string[];

    @Prop({ required: true })
    event_description!: string;

    @Prop({ type: [String], default: [] })
    event_hosts!: string[];

    @Prop({ required: true })
    event_agenda!: string;

    @Prop({ required: true })
    image!: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
