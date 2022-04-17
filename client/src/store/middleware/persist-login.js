import { actionTypes as types } from 'store/action-types';

const persistLogin = store => next => action => {
    const loginTypes = [types.LOGIN_USER_SUCCESS, types.REGISTER_USER_SUCCESS];

    if (loginTypes.includes(action.type)) {
        sessionStorage.token = action.payload.token;
        localStorage.token = action.payload.token;
    }

    if (action.type === types.LOG_OUT_USER) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
    }

    next(action);
};

export default persistLogin;
