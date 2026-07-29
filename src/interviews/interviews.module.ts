import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';
import { Interviews, InterviewsSchema } from './interviews.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Interviews.name, schema: InterviewsSchema },
        ]),
    ],
    controllers: [InterviewsController],
    providers: [InterviewsService],
    exports: [InterviewsService],
})
export class InterviewsModule { }