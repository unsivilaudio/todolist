import produce from 'immer';
import * as Types from 'store/todos/todoTypes';

const __INITIAL_STATE = {
    items: [],
    categories: ['default'],
};

function getUnique(vals) {
    vals = new Set(vals);
    return [...vals];
}

const reducer = produce((draft, action) => {
    switch (action.type) {
        case Types.FETCH_TODOS:
            draft.items = action.payload;
            draft.categories = getUnique([
                ...draft.categories,
                ...action.payload.map(todo => todo.category),
            ]);
            return draft;
        case Types.SAVE_TODO:
            draft.items = draft.items.concat(action.payload);
            return draft;
        case Types.UPDATE_TODO:
            draft.items = draft.items.map(todo => {
                if (todo._id === action.payload._id) todo = action.payload;
                return todo;
            });
            return draft;
        case Types.DELETE_TODO:
            draft.items = draft.items.filter(x => x._id !== action.payload);
            return draft;
        case Types.ADD_CATEGORY:
            if (!draft.categories.includes(action.payload.toLowerCase())) {
                draft.categories = draft.categories.concat(action.payload);
            }
            return draft;
        case Types.DELETE_CATEGORY:
            draft.categories = draft.categories.filter(
                cat => cat !== action.payload
            );
            return draft;
        default:
            return draft;
    }
}, __INITIAL_STATE);

export default reducer;
