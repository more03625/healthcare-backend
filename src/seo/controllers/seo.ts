import { Request } from 'express';

import { seoModel } from "../models";
import { response } from "../../utils";
import { t } from '../constants';
// import { tWithDefaultLocale } from '../constants/messages/message';

const getSeo = async (req: Request) => {
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

        // Calculate skip and limit for pagination
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const skip = (page - 1) * perPage;
        const limit = perPage;

        const count = await seoModel.countDocuments(query);
        const result = await seoModel.find(query).skip(skip).limit(limit);
        return { count, result }
    } catch (err) {
        return response.internalServerError(err);
    }
}

const addSeo = async (req: Request) => {
    try {
        const isExists = await seoModel.findOne({ siteUrl: req.body.siteUrl, pageUrl: req.body.pageUrl });
        if (isExists) {
            return response.conflict(t('ALREADY_EXIST', req.headers));
        }

        return await seoModel.create(req.body);
    } catch (err) {
        return response.internalServerError(err);
    }
}

const updateSeo = async (req: Request) => {
    try {
        const where = { _id: req.body.id }
        const isExists = await seoModel.findOne(where);
        if (isExists) {
            return await seoModel.updateOne(where, req.body);
        }
        return response.notFound(t('NOT_FOUND', req.headers));
    } catch (err) {
        return response.internalServerError(err);
    }
}

const deleteSeo = async (req: Request) => {
    try {
        const where = {
            _id: req.body.id,
        }

        const isExists = await seoModel.findOne(where);
        if (isExists) {
            const result = await seoModel.deleteOne(where, req.body);
            if (result.acknowledged) {
                return { message: t('SEO_DELETE_SUCCESS', req.headers) }
            }
        }

        return response.notFound(t('NOT_FOUND', req.headers));
    } catch (err) {
        return response.internalServerError(err);
    }
}

export default {
    getSeo,
    addSeo,
    updateSeo,
    deleteSeo,
}