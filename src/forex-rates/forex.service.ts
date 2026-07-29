import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ForexService {
    private readonly BASE_URL =
        'https://api.exchangerate.host/latest';

    constructor(private readonly httpService: HttpService) { }

    /**
     * Returns exchange rates against PKR
     */
    async getForexRates() {
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.BASE_URL, {
                    params: {
                        base: 'PKR',
                        symbols: 'USD,EUR,GBP,AED,SAR,CNY,JPY',
                    },
                }),
            );

            const rates = response.data.rates;

            return [
                {
                    currency: 'USD',
                    buying: Number((1 / rates.USD).toFixed(2)),
                    selling: Number(((1 / rates.USD) * 1.01).toFixed(2)),
                },
                {
                    currency: 'EUR',
                    buying: Number((1 / rates.EUR).toFixed(2)),
                    selling: Number(((1 / rates.EUR) * 1.01).toFixed(2)),
                },
                {
                    currency: 'GBP',
                    buying: Number((1 / rates.GBP).toFixed(2)),
                    selling: Number(((1 / rates.GBP) * 1.01).toFixed(2)),
                },
                {
                    currency: 'AED',
                    buying: Number((1 / rates.AED).toFixed(2)),
                    selling: Number(((1 / rates.AED) * 1.01).toFixed(2)),
                },
                {
                    currency: 'SAR',
                    buying: Number((1 / rates.SAR).toFixed(2)),
                    selling: Number(((1 / rates.SAR) * 1.01).toFixed(2)),
                },
            ];
        } catch (err) {
            throw new InternalServerErrorException(
                'Unable to fetch forex data',
            );
        }
    }
}