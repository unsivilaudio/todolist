"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.registerUser = exports.loginToken = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const catch_async_1 = __importDefault(require("../util/catch-async"));
const createSendToken_1 = __importDefault(require("../util/createSendToken"));
const email_1 = require("../util/email");
exports.loginUser = (0, catch_async_1.default)(async (req, res, next) => {
    const { userid, password } = req.body;
    if (!userid || !password)
        throw new Error('Missing params username/email.');
    const name = (0, email_1.isEmail)(userid) ? 'email' : 'username';
    const user = await user_1.default.findOne({ [name]: userid }).select('+password');
    if (!user)
        throw new Error('No user found with that id.');
    const valid = user.comparePassword(password);
    if (!valid)
        throw new Error('Invalid login credentials');
    const message = `Successfully signed in as ${user.username}.`;
    (0, createSendToken_1.default)(user, 200, message, res);
});
exports.loginToken = (0, catch_async_1.default)(async (req, res, next) => {
    const secret = process.env.JWT_SECRET || 'The Quick Brown Fox';
    const { token } = req.query;
    if (!token)
        throw new Error('No token supplied.');
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    let user = await user_1.default.findById(decoded.id).select('-password +passwordUpdatedAt -__v');
    if (!user)
        throw new Error('The user associated with this token no longer exists.');
    if (user.passwordUpdatedAt.getTime() < Number(decoded.iat)) {
        throw new Error('Invalid token supplied. Please log in again');
    }
    res.status(200).json({
        status: 'success',
        user,
    });
});
exports.registerUser = (0, catch_async_1.default)(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body;
    if (!username || !email || !password || !passwordConfirm) {
        throw new Error('Missing required parameters for User.');
    }
    if (password !== passwordConfirm) {
        throw new Error('Passwords do not match!');
    }
    const user = await user_1.default.create({ username, email, password });
    const message = `Successfully registered as ${user.username}`;
    (0, createSendToken_1.default)(user, 201, message, res);
});
exports.changePassword = (0, catch_async_1.default)(async (req, res, next) => {
    const { id, currentPass, nextPass, nextPassConfirm } = req.body;
    if (!id || !currentPass || !nextPass || !nextPassConfirm) {
        throw new Error('Missing parameters for request. Password unchanged.');
    }
    let user = await user_1.default.findById(id).select('password');
    if (!user)
        throw new Error('No user found with that id.');
    const valid = user.comparePassword(currentPass);
    if (!valid)
        throw new Error('Invalid password supplied. Password unchanged.');
    if (nextPass !== nextPassConfirm) {
        throw new Error('Candidate passwords do not match! Password unchanged.');
    }
    user.password = nextPass;
    await user.save();
    res.send(200).json({
        status: 'success',
        message: 'Successfully updated your password.',
    });
});
