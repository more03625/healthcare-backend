import type { Knex } from "knex";
import config from "./src/config"; // Import your DB config

const knexConfig: Knex.Config = {
  client: "pg", // PostgreSQL
  connection: {
    host: config.DB.HOST,
    port: config.DB.PORT,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
    database: config.DB.DATABASE,
  },
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
  pool: { min: 2, max: 10 },
};

export default knexConfig;
