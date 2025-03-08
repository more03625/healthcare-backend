import { Request } from 'express';
import { bannerModel } from "../models";
import { response } from '../../utils';
import { t } from '../constants';

const get = async (req: Request) => {
    try {
        const query: { [key: string]: string } = {};

        if (req.query.siteUrl) {
            query.siteUrl = req.query.siteUrl.toString();
        }

        if (req.query.pageUrl) {
            query.pageUrl = req.query.pageUrl.toString();
        }

        if (req.query.position) {
            query.position = req.query.position.toString();
        }

        if (req.query.isActive) {
            query.isActive = req.query.isActive.toString();
        }

        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const skip = (page - 1) * perPage;
        const limit = perPage;

        const count = await bannerModel.countDocuments(query);
        const result = await bannerModel.find(query).skip(skip).limit(limit);
        return { count, result }
    } catch (err) {
        return response.internalServerError(err);
    }
}

const add = async (req: Request) => {
    try {
        return await bannerModel.create(req.body);
    } catch (err) {
        return response.internalServerError(err);
    }
}

const update = async (req: Request) => {
    try {
        const where = { _id: req.body.id }
        const isExists = await bannerModel.findOne(where);
        if (isExists) {
            return await bannerModel.updateOne(where, req.body);
        }
        return response.notFound(t('BANNER_NOT_FOUND', req.headers));
    } catch (err) {
        return response.internalServerError(err);
    }
}

const remove = async (req: Request) => {
    try {
        const where = {
            _id: req.body.id,
        }

        const isExists = await bannerModel.findOne(where);
        if (isExists) {
            const result = await bannerModel.deleteOne(where, req.body);
            if (result.acknowledged) {
                return { message: t('BANNER_DELETE_SUCCESS', req.headers) }
            }
        }

        return response.notFound(t('BANNER_NOT_FOUND', req.headers));
    } catch (err) {
        return response.internalServerError(err);
    }
}

export default {
    get,
    add,
    update,
    remove
}