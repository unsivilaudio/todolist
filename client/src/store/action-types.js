import * as authTypes from 'store/auth/authTypes';
import * as logTypes from 'store/log/logTypes';
import * as todoTypes from 'store/todos/todoTypes';

export const actionTypes = {
    ...authTypes,
    ...logTypes,
    ...todoTypes,
};
