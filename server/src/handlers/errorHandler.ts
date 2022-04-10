import { Request, Response, NextFunction } from 'express';

interface ErrorError extends Error {
    status?: number;
    message: string;
}

function errorHandler(
    err: ErrorError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    return res.status(err.status || 500).json({
        status: 'failed',
        message: err.message,
    });
}

export default errorHandler;
