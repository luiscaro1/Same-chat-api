import knexfile from "services/db/knexfile";

import knex, { Knex } from "knex";
import Injectable from "services/decorators/injectable";

@Injectable("dbContext")
class DbContext {
  public db: Knex;

  constructor() {
    this.db = knex(
      process.env.NODE_ENV === "production"
        ? knexfile.production
        : knexfile.development
    );
  }

  // TODO: insert getters and setters for the different tables
}

export default DbContext;
