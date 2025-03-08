import { ITracker } from "../interfaces";
import { trackerModel } from "../models";
import { response } from "../../utils";

const logUserInfo = async (data: ITracker) => {
    try {
        return await trackerModel.create(data);
    } catch (err) {
        return response.internalServerError(err);
    }
}

export default {
    logUserInfo,
}