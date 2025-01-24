import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({
    path: './.env.local'
})

const ca = readFileSync(join(__dirname, 'certs', 'prod-ca-2021.crt')).toString();
// console.log('Database URL:', process.env.DATABASE_URL);
// console.log('SSL CA:', ca);

export default defineConfig({
    out: './app/lib/db/drizzle',
    schema: './app/lib/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: { ca, rejectUnauthorized: false },
    },
});
