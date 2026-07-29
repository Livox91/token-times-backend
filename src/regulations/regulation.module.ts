import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegulationController } from './regulation.controller';
import { RegulationService } from './regulation.service';
import { Regulation, RegulationSchema } from './regulation.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Regulation.name, schema: RegulationSchema },
        ]),
    ],
    controllers: [RegulationController],
    providers: [RegulationService],
    exports: [RegulationService],
})
export class RegulationModule { }
