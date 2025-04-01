import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("hospital_staff", (table) => {
        table.integer("hospital_id").notNullable().references("id").inTable("hospitals").onDelete("CASCADE");
        table.integer("staff_id").notNullable().references("id").inTable("staff").onDelete("CASCADE");
        table.string("role", 50).notNullable(); // Doctor, Nurse, Other Staff
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("hospital_staff");
}

