// backend/src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';

@Global() // ← makes db available everywhere without re-importing DatabaseModule
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
