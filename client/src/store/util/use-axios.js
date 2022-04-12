import axios from 'axios';
import store from 'store';

function handleAuth(request) {
    const { token } = store.getState().auth;
    if (token) {
        request.headers.authorization = `Bearer ${token}`;
    }

    return request;
}

function handleAuthFail(error) {
    return Promise.reject(error);
}

const instance = axios.create({
    baseURL: `${window.location.origin}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(handleAuth, handleAuthFail);

export default instance;
