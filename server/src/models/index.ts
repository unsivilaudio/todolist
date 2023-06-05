import Logger from 'express-better-logger';
import mongoose, { ConnectOptions } from 'mongoose';

const log = new Logger('mongoose');

interface MongoOpts extends ConnectOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
}

type ConnectDB = (
    uri: string,
    opts?: ConnectOptions
) => Promise<mongoose.Mongoose>;

const connectDB: ConnectDB = async (uri, opts) => {
    return await mongoose.connect(uri, opts);
};

async function start() {
    try {
        const uri = process.env.MONGO_URI;
        const dbName = process.env.MONGO_OPT_DB;
        if (!uri) throw new Error('Missing URI connection string.');
        if (!dbName) throw new Error('No DB name specified in config');
        const mongoOpts: MongoOpts = {
            dbName: 'todolist',
            connectTimeoutMS: 10000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        const db = await connectDB(uri, mongoOpts);
        log.info('Connected to DB.');

        db.connection.on('error', err => {
            log.error(err.message);
        });

        db.connection.on('disconnect', () => {
            log.info('disconnected from DB');
        });
    } catch (err: any) {
        log.error(err.message);
        process.exit(1);
    }
}

export default { start };
