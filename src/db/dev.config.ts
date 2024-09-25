import { DataSource } from "typeorm"
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions"

export const devConfig: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'perpustakaan.db',
    entities: ['./**/entities/*.entity{.js, .ts}'],
    migrations: ['./migrations/*{.ts, .js}'],
    synchronize: false,
  }
export default new DataSource({
  ...devConfig,
  type: 'sqlite',
})