import { staffService } from "../services";
import { response } from '../../utils';

const getAllStaff = async (payload: Record<string, any>) => {
    try {
        const result = await staffService.getAllStaff(payload);
        return result;
    } catch (err) {
        return response.internalServerError(err);
    }
};

const addStaff = async (payload: Record<string, any>) => {
    try {
        const result = await staffService.createStaff(payload);
        return result;
    } catch (err) {
        return response.internalServerError(err);
    }
};

const updateStaff = async (id: number, payload: Record<string, any>) => {
    try {
        const updatedStaff = await staffService.updateStaff(id, payload);
        return updatedStaff;
    } catch (error) {
        return response.internalServerError(error);
    }
};

const deleteStaff = async (payload: Record<string, any>) => {
    try {
        const deletedStaff = await staffService.deleteStaff(payload.id);
        return deletedStaff;
    } catch (error) {
        return response.internalServerError(error);
    }
};

export default {
    getAllStaff,
    addStaff,
    updateStaff,
    deleteStaff,
};
