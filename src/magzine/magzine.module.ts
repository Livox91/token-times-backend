import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MagzineController } from './magzine.controller';
import { MagzineService } from './magzine.service';
import { Magzine, MagzineSchema } from './magzine.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Magzine.name, schema: MagzineSchema },
        ]),
    ],
    controllers: [MagzineController],
    providers: [MagzineService],
    exports: [MagzineService],
})
export class MagzineModule { }
