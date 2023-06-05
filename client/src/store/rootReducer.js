import { combineReducers } from 'redux';

import authReducer from 'store/auth/authReducer';
import logReducer from 'store/log/logReducer';
import todoReducer from 'store/todos/todoReducer';
import modalsReducer from 'store/modals/modalReducer';

const reducers = combineReducers({
    auth: authReducer,
    log: logReducer,
    todos: todoReducer,
    modals: modalsReducer,
});

export default reducers;
