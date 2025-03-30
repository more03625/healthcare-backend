import { hospitalService } from "../services";
import { response } from '../../utils';

const get = async (payload: Record<string, any>) => {
    try {
        const result = await hospitalService.getAllHospitals(payload);
        return result
    } catch (err) {
        return response.internalServerError(err);
    }
}

export default {
    get,
}