"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});
const createSendToken = (user, statusCode, message, res) => {
    const token = signToken(user._id);
    // @ts-ignore
    let trimmedUser = Object.assign({}, user._doc);
    trimmedUser.__v = undefined;
    trimmedUser.password = undefined;
    trimmedUser.passwordUpdatedAt = undefined;
    trimmedUser.twoFactor = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        user: trimmedUser,
        message,
    });
};
exports.default = createSendToken;
