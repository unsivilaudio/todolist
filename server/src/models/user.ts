import mongoose, { model, Schema, Types, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
    username: string;
    email: string;
}

interface UserBaseDoc extends User, Document {
    password: string;
    passwordUpdatedAt: Date;
    updatedAt: Date;
    createdAt: Date;
}

export interface UserDoc extends UserBaseDoc {
    comparePassword(candPwd: string): boolean;
}

export interface UserModel extends Model<UserDoc> {}

const userSchema = new Schema<UserDoc, UserModel>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            select: false,
        },
        passwordUpdatedAt: {
            type: Date,
            default: Date.now,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePassword = async function (
    candPassword: string
): Promise<boolean> {
    try {
        let isMatch = await bcrypt.compare(candPassword, this.password);
        return isMatch;
    } catch (err: any) {
        return false;
    }
};

userSchema.pre<UserDoc>(/.?(save)/, async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err: any) {
        return next(err);
    }
});

export default model<UserDoc, UserModel>('User', userSchema);
