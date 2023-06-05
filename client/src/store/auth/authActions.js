import axios from 'store/util/use-axios';
import { asyncErrorHandler, toastActionError } from 'store/util/catch-async';
import * as Types from 'store/auth/authTypes';
import toastMessage from 'components/Toast';

export const startRegister = {
    type: Types.REGISTER_USER_START,
};

export const startLogin = {
    type: Types.LOGIN_USER_START,
};

export const loginUser = user =>
    asyncErrorHandler(
        async dispatch => {
            dispatch(startLogin);
            const { data } = await axios.post('/auth/login', user);

            dispatch({
                type: Types.LOGIN_USER_SUCCESS,
                payload: {
                    user: data.user,
                    token: data.token,
                },
            });

            if (data.message) toastMessage({ message: data.message });
        },
        dispatch => err => {
            dispatch({
                type: Types.LOGIN_USER_FAIL,
                payload: err.message,
            });
            toastActionError()(err);
        }
    );

export const registerUser = user =>
    asyncErrorHandler(
        async dispatch => {
            dispatch(startRegister);
            const { data } = await axios.post('/auth/register', user);

            dispatch({
                type: Types.REGISTER_USER_SUCCESS,
                payload: {
                    user: data.user,
                    token: data.token,
                },
            });

            if (data.message) toastMessage({ message: data.message });
        },
        dispatch => err => {
            dispatch({
                type: Types.REGISTER_USER_FAIL,
                payload: err.message,
            });
            toastActionError()(err);
        }
    );

export const tokenLogin = token =>
    asyncErrorHandler(
        async dispatch => {
            const { data } = await axios.get('/auth/login', {
                params: { token },
            });

            dispatch({
                type: Types.TOKEN_LOGIN,
                payload: {
                    user: data.user,
                    token,
                },
            });

            if (data.message) toastMessage({ message: data.message });
        },
        dispatch => err => {
            dispatch({
                type: Types.LOG_OUT_USER,
            });
            toastActionError()(err);
        }
    );

export const logoutUser = () => dispatch => {
    dispatch({
        type: Types.LOG_OUT_USER,
    });
};
