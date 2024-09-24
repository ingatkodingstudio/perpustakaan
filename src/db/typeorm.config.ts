import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { DataSource } from "typeorm"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['./**/entities/*.entity{.js, .ts}'],
    migrations: ['./migrations/*{.ts, .js}'],
    debug: process.env.NODE_ENV === 'development',
    synchronize: false,
  }
export default new DataSource({
  ...typeOrmConfig,
  type: 'mysql'
})