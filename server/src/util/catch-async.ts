import { Request, Response, NextFunction } from 'express';

type AsyncFn = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

type RequestFn = (req: Request, res: Response, next: NextFunction) => void;

type CatchAsync = (fn: AsyncFn) => RequestFn;

const catchAsync: CatchAsync =
    (fn: AsyncFn) =>
    (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    };

export default catchAsync;
