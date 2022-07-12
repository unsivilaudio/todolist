import * as ModalTypes from './modalTypes';

export const showAddCategory = show => dispatch => {
    dispatch({
        type: ModalTypes.SHOW_ADD_CATEGORY,
        payload: show,
    });
};

export const closeModals = () => dispatch => {
    dispatch({
        type: ModalTypes.CLOSE_MODALS,
    });
};
