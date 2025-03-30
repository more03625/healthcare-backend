import { response } from "../../utils";

async function buildFilters(payload: any) {
    try {
        const filters = [];

        if (payload.s) {
            filters.push(`name LIKE '%${payload.s}%'`);
        }
    
        if (payload.id) {
            filters.push(`id = ${payload.id}`);
        }
    
        // default filters
        filters.push(`is_deleted = false`);
        return filters;
    } catch (error) {
        return response.internalServerError(error)
    }
}

export default {
    buildFilters
}