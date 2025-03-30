import express, { Request, Response, NextFunction } from 'express';
import { response, validate } from '../../utils';
import { hospitalSchema } from '../schemas'; // Import the yup schema you created
import { hospitalController } from '../controllers';

const server = express.Router();

server.get('/', validate(hospitalSchema.getHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const payload = {
            ...req.body,
            ...req.params,
            ...req.query,
        }
        const result = await hospitalController.get(payload);
        return response.send(result, res);
    } catch (err: any) {
        return next(err);
    }
});

server.post('/', validate(hospitalSchema.addHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const payload = {
            ...req.body,
            ...req.params,
            ...req.query,
        }
        const result = await hospitalController.addHospital(payload);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.put('/:id', validate(hospitalSchema.updateHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const payload = {
            ...req.body,
            ...req.params,
            ...req.query,
        }
        const result = await hospitalController.updateHospital(payload);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

server.delete('/:id', validate(hospitalSchema.deleteHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const payload = {
            ...req.body,
            ...req.params,
            ...req.query,
        }
        const result = await hospitalController.deleteHospital(payload);
        return response.send(result, res);
    } catch (err) {
        return next(err);
    }
});

export default server;