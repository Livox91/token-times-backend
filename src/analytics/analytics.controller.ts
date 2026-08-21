import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
    @Post('hit')
    @HttpCode(HttpStatus.OK)
    async recordHit(@Body() body: any) {
        // Accept background tracking beacons seamlessly
        return { success: true };
    }
}
