"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const catch_async_1 = __importDefault(require("../util/catch-async"));
const requireAuth = (0, catch_async_1.default)(async (req, res, next) => {
    const secret = process.env.JWT_SECRET || 'The Quick Brown Fox';
    if (!req.headers.authorization || req.headers.authorization === '') {
        throw new Error('Please log in to access this route');
    }
    const token = req.headers.authorization.split(' ')[1];
    const valid = (0, jsonwebtoken_1.verify)(token, secret);
    if (!valid) {
        throw new Error('Invalid or expired token, please log in again.');
    }
    next();
});
exports.default = requireAuth;
