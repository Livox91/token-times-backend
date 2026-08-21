import path from 'node:path';
import { defineConfig, env } from 'prisma/config';
import "dotenv/config";

export default defineConfig({
    schema: path.join('prisma', 'schema.prisma'),
    datasource: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://localhost:5432/postgres"
    }
});
