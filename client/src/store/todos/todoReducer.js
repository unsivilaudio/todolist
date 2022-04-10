import * as Types from 'store/todos/todoTypes';

const reducer = (state = [], action) => {
    switch (action.type) {
        case Types.FETCH_TODOS:
            state = action.payload;
            return state;
        case Types.SAVE_TODO:
            state = state.concat(action.payload);
            return state;
        case Types.UPDATE_TODO:
            state = state.map(todo => {
                if (todo.id === action.payload.id) todo = action.payload;
                return todo;
            });
            return state;
        case Types.DELETE_TODO:
            state = state.filter(x => x.id !== action.payload.id);
            return state;
        default:
            return state;
    }
};

export default reducer;
