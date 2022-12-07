import { registerProvider } from "@tsed/di";
import { DataSource } from "typeorm";
import { Logger } from "@tsed/logger";
import { Party } from "../models/entity/Party";
import { Guest } from "../models/entity/Guest";
import { Task } from "../models/entity/Task";

export const rootDir = __dirname;

export const POSTGRES_DATA_SOURCE = Symbol.for("PostgresDataSource");
export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  entities: [Party, Guest, Task],
  synchronize: true,
  logging: true
});

registerProvider<DataSource>({
  provide: POSTGRES_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await PostgresDataSource.initialize();

    logger.info("Connected with typeorm to database: Postgres");

    return PostgresDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
