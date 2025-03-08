import { Request } from 'express';
import { pageModel } from "../models";
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

        if (req.query.isActive) {
            query.isActive = req.query.isActive.toString();
        }

        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const skip = (page - 1) * perPage;
        const limit = perPage;

        const count = await pageModel.countDocuments(query);
        const result = await pageModel.find(query).skip(skip).limit(limit);
        return { count, result }
    } catch (err) {
        return response.internalServerError(err);
    }
}

const add = async (req: Request) => {
    try {
        const isExists = await pageModel.findOne({ siteUrl: req.body.siteUrl, pageUrl: req.body.pageUrl });
        if (isExists) {
            return response.conflict(t('PAGE_ALREADY_EXIST', req.headers));
        }

        return await pageModel.create(req.body);
    } catch (err) {
        return response.internalServerError(err);
    }
}

const update = async (req: Request) => {
    try {
        const where = { _id: req.body.id }
        const isExists = await pageModel.findOne(where);
        if (isExists) {
            return await pageModel.updateOne(where, req.body);
        }
        return response.notFound(t('PAGE_NOT_FOUND', req.headers));
    } catch (err) {
        return response.internalServerError(err);
    }
}

const remove = async (req: Request) => {
    try {
        const where = {
            _id: req.body.id,
        }

        const isExists = await pageModel.findOne(where);
        if (isExists) {
            const result = await pageModel.deleteOne(where, req.body);
            if (result.acknowledged) {
                return { message: t('PAGE_DELETE_SUCCESS', req.headers) }
            }
        }

        return response.notFound(t('PAGE_NOT_FOUND', req.headers));
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