// backend/src/database/database.provider.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http'; // ← neon-http not node-postgres
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: () => {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, { schema });
    console.log('✅ Neon database connected');
    return db;
  },
};
