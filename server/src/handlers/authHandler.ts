import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import catchAsync from '../util/catch-async';
import createSendToken from '../util/createSendToken';
import { isEmail } from '../util/email';

interface Decoded extends JwtPayload {
    iat: number;
    id: string;
}

export const loginUser = catchAsync(async (req, res, next) => {
    const { userid, password } = req.body;
    if (!userid || !password) throw new Error('Missing params username/email.');
    const name = isEmail(userid) ? 'email' : 'username';

    const user = await User.findOne({ [name]: userid }).select('+password');
    if (!user) throw new Error('No user found with that id.');
    const valid = user.comparePassword(password);
    if (!valid) throw new Error('Invalid login credentials');
    const message = `Successfully signed in as ${user.username}.`;
    createSendToken(user, 200, message, res);
});

export const loginToken = catchAsync(async (req, res, next) => {
    const secret = process.env.JWT_SECRET || 'The Quick Brown Fox';
    const { token } = req.query;
    if (!token) throw new Error('No token supplied.');
    const decoded: Decoded = jwt.verify(token as string, secret) as Decoded;
    let user = await User.findById(decoded.id).select(
        '-password +passwordUpdatedAt -__v'
    );
    if (!user)
        throw new Error(
            'The user associated with this token no longer exists.'
        );

    if (user.passwordUpdatedAt.getTime() < Number(decoded.iat)) {
        throw new Error('Invalid token supplied. Please log in again');
    }
    res.status(200).json({
        status: 'success',
        user,
    });
});

export const registerUser = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body;
    if (!username || !email || !password || !passwordConfirm) {
        throw new Error('Missing required parameters for User.');
    }

    if (password !== passwordConfirm) {
        throw new Error('Passwords do not match!');
    }
    const user = await User.create({ username, email, password });

    const message = `Successfully registered as ${user.username}`;
    createSendToken(user, 201, message, res);
});

export const changePassword = catchAsync(async (req, res, next) => {
    const { id, currentPass, nextPass, nextPassConfirm } = req.body;
    if (!id || !currentPass || !nextPass || !nextPassConfirm) {
        throw new Error('Missing parameters for request. Password unchanged.');
    }

    let user = await User.findById(id).select('password');
    if (!user) throw new Error('No user found with that id.');
    const valid = user.comparePassword(currentPass);
    if (!valid)
        throw new Error('Invalid password supplied. Password unchanged.');
    if (nextPass !== nextPassConfirm) {
        throw new Error(
            'Candidate passwords do not match! Password unchanged.'
        );
    }
    user.password = nextPass;
    await user.save();

    res.send(200).json({
        status: 'success',
        message: 'Successfully updated your password.',
    });
});
