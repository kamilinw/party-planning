import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import { config } from "./config/index";
import * as rest from "./controllers/index";
import { PostgresDataSource } from "./datasources/PostgresDatasource";
import { ClassTransformerPipe } from "./pipes/ClassTransformerPipe";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
import { NotFoundMiddleware } from "./middlewares/NotFoundMiddleware";
import { ClassValidationPipe } from "./pipes/ClassValidationPipe";

export const rootDir = __dirname;

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false,
  mount: {
    "/api/v1": [...Object.values(rest)]
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } }
  ],
  imports: [PostgresDataSource, ClassTransformerPipe, ClassValidationPipe],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  public $afterRoutesInit(): void {
    this.app.use(NotFoundMiddleware).use(ErrorHandlerMiddleware);
  }

  @Configuration()
  protected settings: Configuration;
}
