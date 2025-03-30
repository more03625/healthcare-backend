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

// server.post('/', validate(hospitalSchema.addHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
//     try {
//         const result = await seoController.addSeo(req);
//         return response.send(result, res);
//     } catch (err) {
//         return next(err);
//     }
// });

// server.put('/', validate(hospitalSchema.updateHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
//     try {
//         const result = await seoController.updateSeo(req);
//         return response.send(result, res);
//     } catch (err) {
//         return next(err);
//     }
// });

// server.delete('/', validate(hospitalSchema.deleteHospital), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
//     try {
//         const result = await seoController.deleteSeo(req);
//         return response.send(result, res);
//     } catch (err) {
//         return next(err);
//     }
// });

export default server;