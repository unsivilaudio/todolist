"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authHandler_1 = require("../handlers/authHandler");
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/login').post(authHandler_1.loginUser).get(authHandler_1.loginToken);
router.route('/register').post(authHandler_1.registerUser);
router.route('/user/password').post(authHandler_1.changePassword);
exports.default = router;
