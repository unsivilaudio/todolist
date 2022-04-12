import { Router } from 'express';
import {
    changePassword,
    loginToken,
    loginUser,
    registerUser,
} from '../handlers/authHandler';

const router = Router({ mergeParams: true });

router.route('/login').post(loginUser).get(loginToken);
router.route('/register').post(registerUser);
router.route('/user/password').post(changePassword);

export default router;
