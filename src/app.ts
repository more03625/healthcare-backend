// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import semver from 'semver';
import 'esm';
import path from "path";
import fs from "fs";

// Swagger Config
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json"; // Import auto-generated Swagger JSON

import packageJson from '../package.json';
import { connectDB } from './seo/db';
import { seoRouter, bannerRouter, pageRouter } from './seo/routes';
import { hospitalRouter } from './hospital/routes';
import { errorMiddleware, middleware } from './utils';
import routes from "./routes"; // Import the route configuration



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

// Dynamically load and attach routes
routes.forEach(async ({ prefix, folder }) => {
    try {
        const routePath = path.join(__dirname, folder, `routes/${folder}.ts`); // Adjust for TypeScript (.ts)

        if (!fs.existsSync(routePath)) {
            console.error(`❌ Route file not found: ${routePath}`);
            return;
        }

        const module = await import(routePath); // Dynamically import routes
        console.log('module =>', module)
        if (!module.default) {
            console.error(`❌ No default export in ${routePath}`);
            return;
        }

        app.use(prefix, module.default); // Attach routes
        console.log(`✅ Mounted routes for ${prefix} from ${routePath}`);
    } catch (err) {
        console.error(`❌ Failed to load routes for ${prefix}:`, err);
    }
});


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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/seo', seoRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/pages', pageRouter);
app.use('/api/hospitals', hospitalRouter);

app.use(errorMiddleware);

const port = process.env.APP_PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
    console.log(`Running PORT ${port} on ${NODE_ENV}`);
});