import * as AuthActions from 'store/auth/authActions';
import * as TodoActions from 'store/todos/todoActions';
import * as LogActions from 'store/log/logActions';
import * as ModalActions from 'store/modals/modalActions';

export const actionCreators = {
    ...AuthActions,
    ...LogActions,
    ...TodoActions,
    ...ModalActions,
};
