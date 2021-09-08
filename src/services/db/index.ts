import knexfile from "services/db/knexfile";
import knex, { Knex } from "knex";

const db = knex(knexfile);
