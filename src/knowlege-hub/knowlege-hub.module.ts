import { Module } from '@nestjs/common';

import { KnowlegeHubController } from './knowlege-hub.controller';
import { KnowlegeHubService } from './knowlege-hub.service';

@Module({
    controllers: [KnowlegeHubController],
    providers: [KnowlegeHubService],
    exports: [KnowlegeHubService],
})
export class KnowlegeHubModule { }