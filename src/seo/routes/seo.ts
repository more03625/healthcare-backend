import express, { Request, Response, NextFunction } from 'express';
import { response, validate } from '../../utils';
import { seoSchema } from '../schemas'; // Import the yup schema you created
import { seoController } from '../controllers';

const server = express.Router();

server.get('/', validate(seoSchema.getSeo), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await seoController.getSeo(req);
        return response.send(result, res);
    } catch (err: any) {
        return next(err);
    }
});

server.post('/', validate(seoSchema.addSeo), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await seoController.addSeo(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.put('/', validate(seoSchema.updateSeo), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await seoController.updateSeo(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.delete('/', validate(seoSchema.deleteSeo), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await seoController.deleteSeo(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

export default server;