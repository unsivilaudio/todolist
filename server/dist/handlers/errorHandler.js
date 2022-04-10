"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    return res.status(err.status || 500).json({
        status: 'failed',
        message: err.message,
    });
}
exports.default = errorHandler;
