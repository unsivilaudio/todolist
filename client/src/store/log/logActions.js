import * as Types from 'store/log/logTypes';

function buildPayload(message, show, statusCode) {
    let payload = {
        date: new Date().toISOString(),
        message,
        show: show || false,
        statusCode: null,
    };
    if (statusCode) {
        payload.statusCode = statusCode;
    }

    return payload;
}

export const logError = (message, show, statusCode) => dispatch => {
    const payload = buildPayload(message, show, statusCode);

    dispatch({
        type: Types.LOG_ERROR,
        payload,
    });
};

export const logInfo = (message, show) => dispatch => {
    const payload = buildPayload(message, show);

    dispatch({
        type: Types.LOG_INFO,
        payload,
    });
};
