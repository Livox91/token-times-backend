import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { KnowlegeHubController } from './knowlege-hub.controller';
import { KnowlegeHubService } from './knowlege-hub.service';
import { KnowlegeHub, KnowlegeHubSchema } from './knowlege-hub.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: KnowlegeHub.name, schema: KnowlegeHubSchema },
        ]),
    ],
    controllers: [KnowlegeHubController],
    providers: [KnowlegeHubService],
    exports: [KnowlegeHubService],
})
export class KnowlegeHubModule { }