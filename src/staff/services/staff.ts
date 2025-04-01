// Staff Service
import { client, queryWithLogging } from "../../seo/db"; // Adjust the path as needed
import { HcTables } from "../../../hc-config"; // Assuming you have constants for your table names
import { response } from "../../utils"; // Assuming response utils are present for error handling

// Create a new staff member
const createStaff = async (payload: Record<string, any>) => {
  try {
    const { hospital_id, name, email, phone, role, department, specialization } = payload;

    const query = `
      INSERT INTO ${HcTables.STAFF} (hospital_id, name, email, phone, role, department, specialization)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [hospital_id, name, email, phone, role, department, specialization];

    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    return response.internalServerError(error);
  }
};

// Get all staff members
const getAllStaff = async (payload: Record<string, any>) => {
  try {
    console.log('payload =>', payload)
    const query = `
      SELECT *, COUNT(*) OVER() AS total_count 
      FROM ${HcTables.STAFF}
    `;

    const result = await client.query(query);
    return {
      totalData: result.rows[0]?.total_count,
      data: result.rows,
    };
  } catch (error) {
    return response.internalServerError(error);
  }
};

// Get staff member by ID
const getStaffById = async (id: string) => {
  try {
    const query = `
      SELECT * FROM ${HcTables.STAFF}
      WHERE id = $1;
    `;
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    return response.internalServerError(error);
  }
};

// Update a staff member by ID
const updateStaff = async (id: number, payload: Record<string, any>) => {
  try {
    const columns = Object.keys(payload)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = Object.values(payload);

    if (values.length === 0) return null;

    const query = `
      UPDATE ${HcTables.STAFF}
      SET ${columns}, updated_at = NOW()
      WHERE id = $${values.length + 1}
      RETURNING *;
    `;

    const result = await client.query(query, [...values, id]);
    return result.rows[0];
  } catch (error) {
    return response.internalServerError(error);
  }
};

// Delete a staff member by ID
const deleteStaff = async (id: string) => {
  try {
    const query = `
      DELETE FROM ${HcTables.STAFF}
      WHERE id = $1
      RETURNING *;
    `;
    const result = await queryWithLogging(query, [id]);
    return result.rows[0];
  } catch (error) {
    return response.internalServerError(error);
  }
};

export default {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
