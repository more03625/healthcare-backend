import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes existing entries
    await knex("staff").del();

    // Inserts seed entries
    await knex("staff").insert([
        {
            id: 1,
            name: "Dr. John Doe",
            email: "johndoe@example.com",
            phone: "9876543210",
            role: "Doctor",
            department: "Cardiology",
            specialization: "Heart Surgeon",
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            name: "Alice Smith",
            email: "alice@example.com",
            phone: "9876543211",
            role: "Nurse",
            department: "Pediatrics",
            specialization: null,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
    ]);
};
