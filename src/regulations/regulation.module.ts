import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RegulationController } from './regulation.controller';
import { RegulationService } from './regulation.service';

@Module({
    imports: [AuthModule],
    controllers: [RegulationController],
    providers: [RegulationService],
    exports: [RegulationService],
})
export class RegulationModule { }
