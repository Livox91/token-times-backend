import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) { }

    @Get('trend')
    async trend(
        @Query('symbol') symbol = 'BTCUSDT',
        @Query('interval') interval = '1h',
        @Query('limit') limit = '100',
    ) {
        return this.cryptoService.getMarketTrend(
            symbol,
            interval,
            Number(limit),
        );
    }

    @Get('price')
    async price(@Query('symbol') symbol = 'BTCUSDT') {
        return this.cryptoService.getCurrentPrice(symbol);
    }

    @Get('stats')
    async stats(@Query('symbol') symbol = 'BTCUSDT') {
        return this.cryptoService.get24HourStats(symbol);
    }
}