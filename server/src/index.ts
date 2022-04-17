import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
// @ts-ignore
import cors from 'cors';

import requireAuth from './middleware/requireAuth';
import errorHandler from './handlers/errorHandler';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import mongo from './models';
import Logger from 'express-better-logger/dist/logger';

const log = new Logger('express');
const app = express();
app.use(express.json());
app.use(cors());

interface NotFoundError extends Error {
    status?: number;
}

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env' });
}

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
    });
});

const apiRouter = express.Router({ mergeParams: true });
apiRouter.use('/auth', authRoutes);
apiRouter.use(requireAuth);
apiRouter.use('/todos', todoRoutes);

app.use('/api', apiRouter);

app.use((req, res, next) => {
    let err: NotFoundError = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

async function start() {
    const port = process.env.EXPRESS_PORT;

    try {
        if (!port) throw new Error('Missing port for listen.');
        await mongo.start();
        app.listen(port, () => log.info(`Listening on port ${port}`));
    } catch (err: any) {
        log.error(err.message);
        process.exit(1);
    }
}

start();
