import { Module } from '@nestjs/common';

import { PublishedNewsController } from './published-news.controller';
import { PublishedNewsService } from './published-news.service';

@Module({
    controllers: [PublishedNewsController],
    providers: [PublishedNewsService],
    exports: [PublishedNewsService],
})
export class PublishedNewsModule { }
