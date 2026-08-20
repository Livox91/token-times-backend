import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { KnowlegeHubController } from './knowlege-hub.controller';
import { KnowlegeHubService } from './knowlege-hub.service';

@Module({
    imports: [AuthModule],
    controllers: [KnowlegeHubController],
    providers: [KnowlegeHubService],
    exports: [KnowlegeHubService],
})
export class KnowlegeHubModule { }