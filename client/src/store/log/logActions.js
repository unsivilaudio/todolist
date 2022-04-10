import * as Types from 'store/log/logTypes';

export const logError = (message, show, statusCode) => dispatch => {
    dispatch({
        type: Types.LOG_ERROR,
        payload: {
            date: new Date().toISOString(),
            message,
            show: show || false,
            statusCode: statusCode || 'n/a',
        },
    });
};

export const logInfo = (message, show) => dispatch => {
    dispatch({
        type: Types.LOG_INFO,
        payload: {
            date: new Date().toISOString(),
            message,
            show: show || false,
        },
    });
};
