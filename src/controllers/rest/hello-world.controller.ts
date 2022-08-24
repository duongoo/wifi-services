import {Controller, Inject} from "@tsed/di";
import {Get} from "@tsed/schema";
import { MSSQL_DATA_SOURCE } from "../../datasources/mssql.datasource";
import { DataSource } from "typeorm";

@Controller("/hello-world")
export class HelloWorldController {

  @Inject(MSSQL_DATA_SOURCE)
  protected mysqlDataSource: DataSource;

  @Get("/")
  get() {
    return "hello";
  }
}
