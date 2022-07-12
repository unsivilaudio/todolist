import * as authTypes from 'store/auth/authTypes';
import * as logTypes from 'store/log/logTypes';
import * as todoTypes from 'store/todos/todoTypes';
import * as modalTypes from 'store/modals/modalTypes';

export const actionTypes = {
    ...authTypes,
    ...logTypes,
    ...todoTypes,
    ...modalTypes,
};
