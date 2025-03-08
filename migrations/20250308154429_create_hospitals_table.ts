import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("hospitals", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("phone", 20).notNullable().unique();
        table.text("address").notNullable();
        table.string("city", 100).notNullable();
        table.string("state", 100).notNullable();
        table.string("country", 100).notNullable();
        table.string("pincode", 10).notNullable();
        table.integer("admin_id").notNullable(); // Hospital Admin (Owner)
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("hospitals");
}
