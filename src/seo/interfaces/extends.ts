import { Request } from 'express';

interface CustomRequest extends Request {
    headers: {
        [key: string]: string | string[] | undefined;
    }
}

export default CustomRequest;