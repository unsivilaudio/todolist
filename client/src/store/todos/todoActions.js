import axios from 'store/util/use-axios';
import { asyncErrorHandler, toastActionError } from 'store/util/catch-async';
import toast from 'components/Toast';
import * as Types from 'store/todos/todoTypes';

export const fetchTodos = () =>
    asyncErrorHandler(async dispatch => {
        const { data } = await axios.get('/todos');

        dispatch({
            type: Types.FETCH_TODOS,
            payload: data.data,
        });
    });

export const saveTodo = todo =>
    asyncErrorHandler(async dispatch => {
        const { data } = await axios.post('/todos', todo);

        dispatch({
            type: Types.SAVE_TODO,
            payload: data.data,
        });

        if (data.message) {
            toast({ message: data.message });
        }
    }, toastActionError);

export const updateTodo = todo =>
    asyncErrorHandler(async dispatch => {
        const { data } = await axios.post('/todos/' + todo._id, todo);

        dispatch({
            type: Types.UPDATE_TODO,
            payload: data.data,
        });

        if (data.message) {
            toast({ message: data.message });
        }
    }, toastActionError);

export const deleteTodo = id =>
    asyncErrorHandler(async dispatch => {
        const { data } = await axios.delete('/todos/' + id);

        dispatch({
            type: Types.DELETE_TODO,
            payload: id,
        });

        if (data.message) {
            toast({ type: 'info', message: data.message });
        }
    }, toastActionError);

export const addCategory = category => dispatch => {
    dispatch({
        type: Types.ADD_CATEGORY,
        payload: category,
    });
};

export const removeCategory = category => dispatch => {
    dispatch({
        type: Types.DELETE_CATEGORY,
        payload: category,
    });
};
