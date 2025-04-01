import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("staff", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("phone", 20).notNullable().unique();
        table.enu("role", ["Doctor", "Nurse", "Other Staff"]).notNullable();
        table.string("department", 100).nullable();
        table.string("specialization", 100).nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("staff");
}

