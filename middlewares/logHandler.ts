import { Request, Response, NextFunction } from 'express';
import logger from '../winstonConfig'

export function logHandler(req: Request, res: Response, next: NextFunction) {
    // get ip address of the client
    res.on('finish', () => {
        const { statusCode } = res;
        if (statusCode >= 400 && statusCode < 600) {
            logger.error(`METHOD: ${req.method},  PATH:${req.path} - STATUS_CODE: ${res.statusCode} - TIMESTAMP: ${new Date().toISOString()}`);
        } else {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            logger.info(`Request -> IP: ${ip}, METHOD: ${req.method}, PATH: ${req.path}`);
            logger.info(`Response -> STATUS_CODE: ${res.statusCode} - TIMESTAMP: ${new Date().toISOString()}`);
        }
    });
    
    
    next();
}