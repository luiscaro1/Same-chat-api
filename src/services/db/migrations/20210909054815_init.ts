import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Room", (table) => {
    table.uuid("rid").unique().notNullable();
    table.string("name").notNullable();
    table.specificType("members", "text ARRAY").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists("Room");
}
