import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PublishedNewsController } from './published-news.controller';
import { PublishedNewsService } from './published-news.service';

@Module({
    imports: [AuthModule],
    controllers: [PublishedNewsController],
    providers: [PublishedNewsService],
    exports: [PublishedNewsService],
})
export class PublishedNewsModule { }
