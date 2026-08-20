import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MagzineController } from './magzine.controller';
import { MagzineService } from './magzine.service';

@Module({
    imports: [AuthModule],
    controllers: [MagzineController],
    providers: [MagzineService],
    exports: [MagzineService],
})
export class MagzineModule { }
