require("dotenv").config();
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.MOCKDB_DATABASE,
  migrationsRun: true,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/books/infra/typeorm/entities/*.ts"],
});
