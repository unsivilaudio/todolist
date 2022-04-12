import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import catchAsync from '../util/catch-async';

const requireAuth = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const secret = process.env.JWT_SECRET || 'The Quick Brown Fox';
        if (!req.headers.authorization || req.headers.authorization === '') {
            throw new Error('Please log in to access this route');
        }

        const token = req.headers.authorization.split(' ')[1];
        const valid = verify(token, secret);
        if (!valid) {
            throw new Error('Invalid or expired token, please log in again.');
        }

        next();
    }
);

export default requireAuth;
