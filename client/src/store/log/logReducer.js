import * as types from 'store/log/logTypes';

const __INITIAL_STATE = {
    info: [],
    error: [],
};

const reducer = (state = __INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOG_ERROR:
            state = state.concat(action.payload);
            return state;
        case types.LOG_INFO:
            state = state.concat(action.payload);
            return state;
        default:
            return state;
    }
};

export default reducer;
