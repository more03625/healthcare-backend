import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Clear existing data
    await knex("hospitals").del();

    // Insert sample hospitals
    await knex("hospitals").insert([
        {
            name: "Apollo Hospital",
            email: "apollo@example.com",
            phone: "9876543210",
            address: "123 Health Street",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            pincode: "400001",
            admin_id: 2,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            name: "Fortis Hospital",
            email: "fortis@example.com",
            phone: "9123456789",
            address: "456 Care Avenue",
            city: "Delhi",
            state: "Delhi",
            country: "India",
            pincode: "110001",
            admin_id: 1,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
    ]);
}
