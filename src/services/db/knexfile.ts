import { Knex } from "knex";

const { HOST, PORT, USER, PW, DB } = process.env;

const configs: Knex.Config = {
  client: "pg",
  connection: {
    port: parseInt(PORT as string, 10),
    host: HOST,
    database: DB,
    user: USER,
    password: PW,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
  },
};

export default configs;
