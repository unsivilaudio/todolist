"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
userSchema.methods.comparePassword = async function (candPassword) {
    try {
        let isMatch = await bcrypt_1.default.compare(candPassword, this.password);
        return isMatch;
    }
    catch (err) {
        return false;
    }
};
userSchema.pre(/.?(save)/, async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        let hashedPassword = await bcrypt_1.default.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
