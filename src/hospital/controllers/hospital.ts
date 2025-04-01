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

const addHospital = async (payload: Record<string, any>) => {
    try {
        const result = await hospitalService.createHospital(payload);
        return result
    } catch (err) {
        return response.internalServerError(err);
    }
}

const updateHospital = async (payload: Record<string, any>) => {
    try {
        const updatedHospital = await hospitalService.updateHospital(Number(payload.id), payload);
        return updatedHospital
    } catch (error) {
        return response.internalServerError(error);
    }
};

const deleteHospital = async (payload: Record<string, any>) => {
    try {

        const updatedHospital = await hospitalService.deleteHospital(Number(payload.id));
        return updatedHospital
    } catch (error) {
        return response.internalServerError(error);
    }
};

export default {
    get,
    addHospital,
    updateHospital,
    deleteHospital
}