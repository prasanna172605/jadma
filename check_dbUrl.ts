import dotenv from 'dotenv';
dotenv.config();

let dbUrl = process.env.DATABASE_URL || '';
if (dbUrl.startsWith('DATABASE_URL=')) {
  dbUrl = dbUrl.replace(/^DATABASE_URL=/, '').replace(/^"/, '').replace(/"$/, '');
}
if (dbUrl.includes('Jadmaa@2026')) {
  dbUrl = dbUrl.replace('Jadmaa@2026', 'Jadmaa%402026');
}

console.log("Final DB URL passed to Prisma:");
console.log(dbUrl);
