// Create a new hospital
import { client, queryWithLogging } from "../../seo/db"; // Adjust the path as needed
import { filters } from "../utils";
import { HcTables } from '../../../hc-config'
import { response } from "../../utils";

const createHospital = async (payload: Record<string, any>) => {
  const { name, email, phone, address, city, state, country, pincode, admin_id } = payload;

  const query = `
    INSERT INTO ${HcTables.HOSPITALS} (name, email, phone, address, city, state, country, pincode, admin_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [name, email, phone, address, city, state, country, pincode, admin_id];

  const result = await client.query(query, values);
  return result.rows[0];
};

// Get all hospitals
const getAllHospitals = async (payload: Record<string, any>) => {
  try {
    const getFilters = await filters.buildFilters(payload);
    const whereClause = getFilters.length > 0 ? `WHERE ${getFilters.join(' AND ')}` : '';

    console.log('getFilters ==>', getFilters)
    const query = `
      SELECT * FROM ${HcTables.HOSPITALS} ${whereClause};
    `;
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    return response.internalServerError(error)
  }
};

// Get a hospital by ID
const getHospitalById = async (id: number) => {
  const query = `
    SELECT * FROM ${HcTables.HOSPITALS}
    WHERE id = ?;
  `;
  const result = await client.query(query, [id]);
  return result.rows[0];
};

// Update a hospital by ID
const updateHospital = async (id: Number, payload: Record<string, any>) => {
  const columns = Object.keys(payload).map((key, index) => `${key} = $${index + 1}`).join(", ");
  const values = Object.values(payload);

  if (values.length === 0) return null;

  const query = `
    UPDATE ${HcTables.HOSPITALS} 
    SET ${columns}, updated_at = NOW() 
    WHERE id = $${values.length + 1} 
    RETURNING *;
  `;

  const result = await client.query(query, [...values, id]);
  return result.rows[0];
};

// Delete a hospital by ID
const deleteHospital = async (id: number) => {
  const query = `
    UPDATE ${HcTables.HOSPITALS} 
    SET is_deleted = true, updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;
  const result = await queryWithLogging(query, [id]);
  return result.rows[0]; // Returns deleted hospital data
};



export default {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
}