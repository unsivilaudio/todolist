import * as AuthActions from 'store/auth/authActions';
import * as TodoActions from 'store/todos/todoActions';
import * as LogActions from 'store/log/logActions';

export const actionCreators = {
    ...AuthActions,
    ...LogActions,
    ...TodoActions,
};
