import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let dbUrl = process.env.DATABASE_URL || process.env.DIRECT_URL || '';

// Clean up incorrectly pasted platform env vars
if (dbUrl.startsWith('DATABASE_URL=')) {
  dbUrl = dbUrl.replace(/^DATABASE_URL=/, '').replace(/^"/, '').replace(/"$/, '');
}

// Fix unencoded @ in the password if present
if (dbUrl.includes('Jadmaa@2026')) {
  dbUrl = dbUrl.replace('Jadmaa@2026', 'Jadmaa%402026');
}

export const prisma = new PrismaClient({
  datasourceUrl: dbUrl || undefined,
});
