import toast from 'components/Toast';
import { logError } from 'store/log/logActions';
import Store from 'store';

export const asyncErrorHandler =
    (asyncFn, onErrCb) =>
    async (...args) => {
        try {
            await asyncFn(...args);
        } catch (err) {
            // console.log(err);
            createLogError(err);
            if (onErrCb) {
                onErrCb(...args)(err);
            }
        }
    };

export const createLogError = err => {
    if (!err || !err.response) return;
    // console.log(err);
    const statusCode = err.status;
    const { message } = err.response.data;
    Store.dispatch(logError(message, true, statusCode));
};

export const toastActionError = () => err => {
    if (!err?.response) return;
    const type = 'error';
    let {
        data: { message },
    } = err.response;
    if (err.response && !message) {
        message = 'Oops! Something went wrong with your request';
    }

    toast({ type, message });
    return null;
};
