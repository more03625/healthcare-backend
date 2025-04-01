import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes existing entries
    await knex("hospital_staff").del();

    // Inserts seed entries
    await knex("hospital_staff").insert([
        {
            hospital_id: 16, // Replace with an existing hospital ID
            staff_id: 1,
            role: "Doctor",
            created_at: knex.fn.now(),
        },
        {
            hospital_id: 17, // Replace with an existing hospital ID
            staff_id: 2,
            role: "Nurse",
            created_at: knex.fn.now(),
        },
    ]);
};
