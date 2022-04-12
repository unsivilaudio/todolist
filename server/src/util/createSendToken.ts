const jwt = require('jsonwebtoken');
import { Response } from 'express';
import { UserDoc } from '../models/user';

const signToken = (id: string): string =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (
    user: UserDoc,
    statusCode: number,
    message: string,
    res: Response
) => {
    const token = signToken(user._id);
    // @ts-ignore
    let trimmedUser: any = Object.assign({}, user._doc);
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

export default createSendToken;
