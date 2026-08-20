import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CryptoService {
    private readonly BINANCE_API = 'https://api.binance.com/api/v3';

    constructor(private readonly httpService: HttpService) { }

    /**
     * Fetch candlestick data
     *
     * Example:
     * BTCUSDT
     * ETHUSDT
     * SOLUSDT
     *
     * intervals:
     * 1m,3m,5m,15m,30m
     * 1h,2h,4h,6h,8h,12h
     * 1d,3d,1w,1M
     */
    async getMarketTrend(
        symbol = 'BTCUSDT',
        interval = '1h',
        limit = 100,
    ) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.BINANCE_API}/klines`, {
                    params: {
                        symbol,
                        interval,
                        limit,
                    },
                }),
            );

            return response.data.map((candle: any[]) => ({
                openTime: candle[0],
                open: Number(candle[1]),
                high: Number(candle[2]),
                low: Number(candle[3]),
                close: Number(candle[4]),
                volume: Number(candle[5]),
                closeTime: candle[6],
            }));
        } catch (err) {
            throw new InternalServerErrorException(
                'Failed to fetch Binance market data',
            );
        }
    }

    async get24HourTickerData(symbol = 'BTCUSDT') {
        return this.getMarketTrend(symbol, '1h', 24);
    }

    /**
     * Latest price
     */
    async getCurrentPrice(symbol = 'BTCUSDT') {
        const response = await firstValueFrom(
            this.httpService.get(`${this.BINANCE_API}/ticker/price`, {
                params: { symbol },
            }),
        );

        return {
            symbol: response.data.symbol,
            price: Number(response.data.price),
        };
    }

    /**
     * 24-hour statistics
     */
    async get24HourStats(symbol = 'BTCUSDT') {
        const response = await firstValueFrom(
            this.httpService.get(`${this.BINANCE_API}/ticker/24hr`, {
                params: { symbol },
            }),
        );

        const data = response.data;

        return {
            symbol: data.symbol,
            priceChangePercent: Number(data.priceChangePercent),
            lastPrice: Number(data.lastPrice),
            highPrice: Number(data.highPrice),
            lowPrice: Number(data.lowPrice),
            volume: Number(data.volume),
            quoteVolume: Number(data.quoteVolume),
        };
    }
}