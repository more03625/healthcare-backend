// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import semver from 'semver';
import 'esm';

import packageJson from '../package.json';
import { connectDB } from './seo/db';
import { seoRouter, bannerRouter, pageRouter } from './seo/routes';
import { hospitalRouter } from './hospital/routes';
import { errorMiddleware, middleware } from './utils';

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware);

process.env.TZ = process.env.TIME_ZONE || "America/New_York"


if (!semver.satisfies(process.version, `>=${packageJson.engines.node}`)) {
    console.error(`Required Node.js version is ${packageJson.engines.node}, but you are using ${process.version}.`);
    process.exit(1);
}

const connectToDB = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.log('connectToDB error', error);
    }
}

connectToDB();

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.ip);
    res.send({
        success: true,
        message: "Welcome to healthcare-backend, helping you to eliminate common repetitive tasks!",
    });
    return next()
});

app.get('/ping', (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.ip);
    res.send('Thank you for pinging User Management!');
    return next()
})

app.get('/health-check', (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.ip);
    res.send('Health check working as it it!');
    return next()
});

app.use('/api/seo', seoRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/pages', pageRouter);
app.use('/api/hospitals', hospitalRouter);

app.use(errorMiddleware);

const port = process.env.APP_PORT || 8083;
const NODE_ENV = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
    console.log(`Running PORT ${port} on ${NODE_ENV}`);
});