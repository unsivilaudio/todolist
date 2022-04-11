import { combineReducers } from 'redux';

import authReducer from 'store/auth/authReducer';
import logReducer from 'store/log/logReducer';
import todoReducer from 'store/todos/todoReducer';

const reducers = combineReducers({
    auth: authReducer,
    log: logReducer,
    todos: todoReducer,
});

export default reducers;
