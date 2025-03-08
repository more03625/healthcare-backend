import express, { Request, Response, NextFunction } from 'express';
import { response, validate } from '../../utils';
import { pageSchema } from '../schemas'; // Import the yup schema you created
import { pageController } from '../controllers';

const server = express.Router();

server.get('/', validate(pageSchema.get), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await pageController.get(req);
        return response.send(result, res);
    } catch (err: any) {
        return next(err);
    }
});

server.post('/', validate(pageSchema.add), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await pageController.add(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.put('/', validate(pageSchema.update), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await pageController.update(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.delete('/', validate(pageSchema.remove), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await pageController.remove(req);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

export default server;