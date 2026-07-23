import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './entities/article.entity';

@Module({

    imports: [MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])],
    providers: [ArticlesService],
    exports: [ArticlesService], // Export if other modules need access to articles
})
export class ArticlesModule { }