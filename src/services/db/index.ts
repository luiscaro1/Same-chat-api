import knexfile from "services/db/knexfile";
import knex, { Knex } from "knex";
import Injectable from "services/decorators/injectable";

@Injectable("dbContext")
export default class DbContext {
  private db: Knex;

  constructor() {
    this.db = knex(knexfile);
  }

  // TODO: insert getters and setters for the different tables
}
