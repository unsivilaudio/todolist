import * as Types from 'store/auth/authTypes';
import produce from 'immer';

const __INITIAL_STATE = {
    token: null,
    user: null,
    loading: false,
};

const reducer = produce((draft, action) => {
    switch (action.type) {
        case Types.REGISTER_USER_START:
        case Types.LOGIN_USER_START:
            draft.loading = true;
            return draft;
        case Types.REGISTER_USER_SUCCESS:
        case Types.LOGIN_USER_SUCCESS:
        case Types.TOKEN_LOGIN:
            draft.user = action.payload.user;
            draft.token = action.payload.token;
            draft.loading = false;
            return draft;
        case Types.REGISTER_USER_FAIL:
        case Types.LOGIN_USER_FAIL:
            draft.loading = false;
            return draft;
        case Types.LOG_OUT_USER:
            draft.user = null;
            draft.token = null;
            return draft;
        default:
            return draft;
    }
}, __INITIAL_STATE);

export default reducer;
