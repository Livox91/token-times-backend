import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Events, EventsSchema } from './events.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Events.name, schema: EventsSchema },
        ]),
    ],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService],
})
export class EventsModule { }