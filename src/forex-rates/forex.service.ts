import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ForexService {
    private readonly BASE_URL = 'https://api.frankfurter.dev/v2/rate';

    private readonly PAIRS = [
        { base: 'USD', quote: 'PKR', name: 'USD to Pakistani Rupee' },
        { base: 'USD', quote: 'JPY', name: 'USD to Japanese Yen' },
        { base: 'USD', quote: 'CHF', name: 'USD to Swiss Franc' },
        { base: 'GBP', quote: 'USD', name: 'Pound Sterling to USD' },
        { base: 'EUR', quote: 'USD', name: 'Euro to USD' },
    ];

    constructor(private readonly httpService: HttpService) { }

    async getForexRates() {
        try {
            const results = await Promise.allSettled(this.PAIRS.map(async (pair) => {
                const response = await firstValueFrom(
                    this.httpService.get(`${this.BASE_URL}/${pair.base}/${pair.quote}`),
                );
                const data = response.data;

                return {
                    name: pair.name,
                    base: data.base,
                    quote: data.quote,
                    date: data.date,
                    rate: Number(data.rate),
                };
            }));

            return results
                .filter((result): result is PromiseFulfilledResult<{
                    name: string;
                    base: string;
                    quote: string;
                    date: string;
                    rate: number;
                }> => result.status === 'fulfilled')
                .map((result) => result.value);
        } catch (err) {
            throw new InternalServerErrorException(
                'Unable to fetch forex data',
            );
        }
    }
}