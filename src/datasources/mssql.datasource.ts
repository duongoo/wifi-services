import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";

export const MSSQL_DATA_SOURCE = Symbol.for("MssqlDataSource");
export const MssqlDataSource = new DataSource({
  type: "mssql",
  synchronize: true,
  entities:  ["src/models/**/*.ts"],
  host: "192.168.20.15",
  username: "admin",
  password: "admin",
  database: "tsedDemo",
  entityPrefix:"ds_",
  options: { encrypt: false }
});

MssqlDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

registerProvider<DataSource>({
  provide: MSSQL_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await MssqlDataSource.initialize();

    logger.info("Connected with typeorm to database: Mssql");

    return MssqlDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
