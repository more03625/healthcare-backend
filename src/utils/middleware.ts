import geoIp from "geoip-lite";
import UAParser from 'ua-parser-js';

import { NextFunction, Request, Response } from 'express';

const trackUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(res.addListener);
        // Intercept the incoming request here
        const uaParser = new UAParser();

        const pageUrl = req.url.substring(1);
        const ipAddress = req.headers['x-forwarded-for']?.toString() || req.connection.remoteAddress?.toString();
        const geoLocation = ipAddress ? geoIp.lookup(ipAddress.toString()) : '';
        const userAgent = req.headers['user-agent'] || '';
        uaParser.setUA(userAgent);
        const uaParserResult = uaParser.getResult();

        // Prepare a data Object
        const data = {
            pageUrl: pageUrl || '',
            referer: req.headers.referer || '',
            ipAddress: ipAddress || '',
            visitedAt: Date.now(),
            demoGraphic: uaParserResult,
            geoLocation: geoLocation || {},
        };

        console.log('Track User Data =>', data);
        
        // return trackerController.logUserInfo(data)
    } catch (error) {
        return next();
    }
}
const middleware = (req: Request, res: Response, next: NextFunction): void => {
    trackUser(req, res, next);
    next();
}

export default middleware;