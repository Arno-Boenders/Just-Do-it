const tableName = "tasks";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.text("content").notNullable();
    table.boolean("is_done").defaultTo(false);
    table.integer("category_id").unsigned().notNullable();
    table.foreign("category_id").references("id").inTable("categories");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
