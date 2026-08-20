import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        // Create the connection pool using the pg package
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL
        });

        // Pass the pool to the Prisma adapter
        const adapter = new PrismaPg(pool);

        // Pass the adapter into the PrismaClient constructor via super()
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}