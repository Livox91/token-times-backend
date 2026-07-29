import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';
import { Research, ResearchSchema } from './entities/research.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Research.name, schema: ResearchSchema },
        ]),
    ],
    controllers: [ResearchController],
    providers: [ResearchService],
    exports: [ResearchService],
})
export class ResearchModule { }
