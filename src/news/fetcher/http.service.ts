import { Injectable, Logger } from '@nestjs/common';
import { request } from 'undici';

@Injectable()
export class HttpService {
    private readonly logger = new Logger(HttpService.name);

    private readonly headers = {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36',
        Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    };

    async fetchHtml(url: string): Promise<string> {
        let lastError: unknown;

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const response = await request(url, {
                    method: 'GET',
                    headers: this.headers,
                    headersTimeout: 10000,
                    bodyTimeout: 10000,
                });

                if (response.statusCode >= 400) {
                    throw new Error(`HTTP ${response.statusCode}`);
                }

                return await response.body.text();
            } catch (err) {
                lastError = err;
                this.logger.warn(
                    `Attempt ${attempt} failed for ${url}`,
                );

                await new Promise((r) =>
                    setTimeout(r, attempt * 1000),
                );
            }
        }

        throw lastError;
    }
}