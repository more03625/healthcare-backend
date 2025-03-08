import express, { Request, Response, NextFunction } from 'express';
import { response, validate } from '../../utils';
import { bannerSchema } from '../schemas'; // Import the yup schema you created
import { bannerController } from '../controllers';

const server = express.Router();

server.get('/', validate(bannerSchema.get), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await bannerController.get(req);
        return response.send(result, res);
    } catch (err: any) {
        return next(err);
    }
});

server.post('/', validate(bannerSchema.add), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await bannerController.add(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.put('/', validate(bannerSchema.update), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await bannerController.update(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.delete('/', validate(bannerSchema.remove), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await bannerController.remove(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

export default server;