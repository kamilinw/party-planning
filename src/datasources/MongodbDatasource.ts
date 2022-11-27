import { registerProvider } from "@tsed/di";
import { DataSource } from "typeorm";
import { Logger } from "@tsed/logger";

export const MONGODB_DATA_SOURCE = Symbol.for("MongodbDataSource");
export const MongodbDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DATABASE_URL,
  dropSchema: false,
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  authSource: "admin",
  retryWrites: true,
  entities: ["src/model/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  logging: true
});

registerProvider<DataSource>({
  provide: MONGODB_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await MongodbDataSource.initialize();

    logger.info("Connected with typeorm to database: Mongodb");

    return MongodbDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
