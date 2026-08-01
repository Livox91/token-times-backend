import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PublishedNewsController } from './published-news.controller';
import { PublishedNewsService } from './published-news.service';
import { PublishedNews, PublishedNewsSchema } from './published-news.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PublishedNews.name, schema: PublishedNewsSchema },
        ]),
    ],
    controllers: [PublishedNewsController],
    providers: [PublishedNewsService],
    exports: [PublishedNewsService],
})
export class PublishedNewsModule { }
