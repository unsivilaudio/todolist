import * as ModalTypes from 'store/modals/modalTypes';

const __INITIAL_STATE = {
    showAddCategory: false,
};

const reducer = (state = __INITIAL_STATE, action) => {
    switch (action.type) {
        case ModalTypes.SHOW_ADD_CATEGORY:
            return { ...state, showAddCategory: action.payload };
        case ModalTypes.CLOSE_MODALS:
            return __INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;
