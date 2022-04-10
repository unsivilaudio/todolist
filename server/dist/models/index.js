"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../util/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const log = new logger_1.default('mongoose');
const connectDB = async (uri, opts) => {
    return await mongoose_1.default.connect(uri, opts);
};
async function start() {
    try {
        const uri = process.env.MONGO_URI;
        const dbName = process.env.MONGO_OPT_DB;
        if (!uri)
            throw new Error('Missing URI connection string.');
        if (!dbName)
            throw new Error('No DB name specified in config');
        const mongoOpts = {
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
    }
    catch (err) {
        log.error(err.message);
        process.exit(1);
    }
}
exports.default = { start };
