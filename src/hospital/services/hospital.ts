// Create a new hospital
import { client } from "../../seo/db"; // Adjust the path as needed
import { filters } from "../utils";
import { HcTables } from '../../../hc-config'
import { response } from "../../utils";

const createHospital = async (payload: Record<string, any>) => {
  const { name, email, phone, address, city, state, country, pincode, admin_id } = payload;

  const query = `
    INSERT INTO hospitals (name, email, phone, address, city, state, country, pincode, admin_id)
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
    SELECT * FROM hospitals
    WHERE id = ?;
  `;
  const result = await client.query(query, [id]);
  return result.rows[0];
};

// Update a hospital by ID
const updateHospital = async (id: number, name: string, location: string) => {
  const query = `
    UPDATE hospitals
    SET name = ?, location = ?
    WHERE id = ?
    RETURNING *;
  `;
  const result = await client.query(query, [name, location, id]);
  return result.rows[0];
};

// Delete a hospital by ID
const deleteHospital = async (id: number) => {
  const query = `
    DELETE FROM hospitals
    WHERE id = ?
    RETURNING *;
  `;
  const result = await client.query(query, [id]);
  return result.rows[0];
};


export default {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
}