import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

@Module({
    imports: [HttpModule],
    controllers: [ForexController],
    providers: [ForexService],
    exports: [ForexService],
})
export class ForexModule { }