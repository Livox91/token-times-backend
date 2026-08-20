import { Module } from '@nestjs/common';

import { MagzineController } from './magzine.controller';
import { MagzineService } from './magzine.service';

@Module({
    controllers: [MagzineController],
    providers: [MagzineService],
    exports: [MagzineService],
})
export class MagzineModule { }
