import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftSchema } from './entities/draft.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { MongooseModule } from '@nestjs/mongoose';

@Module({

    imports: [MongooseModule.forFeature([{ name: 'Draft', schema: DraftSchema }])],
    providers: [DraftService],
    exports: [DraftService], // Export if other modules need access to drafts
})
export class DraftModule { }