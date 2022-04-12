"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// @ts-ignore
const cors_1 = __importDefault(require("cors"));
const requireAuth_1 = __importDefault(require("./middleware/requireAuth"));
const errorHandler_1 = __importDefault(require("./handlers/errorHandler"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const models_1 = __importDefault(require("./models"));
const logger_1 = __importDefault(require("./util/logger"));
const log = new logger_1.default('express');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: '.env.production' });
}
else {
    dotenv_1.default.config({ path: '.env' });
}
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
    });
});
const apiRouter = express_1.default.Router({ mergeParams: true });
apiRouter.use('/auth', authRoutes_1.default);
apiRouter.use(requireAuth_1.default);
apiRouter.use('/todos', todoRoutes_1.default);
app.use('/api', apiRouter);
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(errorHandler_1.default);
async function start() {
    const port = process.env.EXPRESS_PORT;
    try {
        if (!port)
            throw new Error('Missing port for listen.');
        await models_1.default.start();
        app.listen(port, () => log.info(`Listening on port ${port}`));
    }
    catch (err) {
        log.error(err.message);
        process.exit(1);
    }
}
start();
