import { combineReducers } from 'redux';

import logReducer from 'store/log/logReducer';
import todoReducer from 'store/todos/todoReducer';

const reducers = combineReducers({
    log: logReducer,
    todos: todoReducer,
});

export default reducers;
