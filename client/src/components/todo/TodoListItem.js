import React from 'react';
import { Delete, Edit } from '@material-ui/icons';

import classes from 'styles/todo/TodoListItem.module.scss';

const TodoListItem = props => {
    const { clicked, isCompleted, content, editItem, deleteItem } = props;
    return (
        <li className={classes.TodoListItem}>
            <p
                onClick={clicked}
                className={[
                    classes.Content,
                    isCompleted ? classes.Done : '',
                ].join(' ')}>
                {content}
            </p>
            <div className={classes.Actions}>
                <span className={classes.Edit} onClick={editItem}>
                    <Edit style={{ fontSize: 'inherit' }} />
                </span>
                <span className={classes.Delete} onClick={deleteItem}>
                    <Delete style={{ fontSize: 'inherit' }} />
                </span>
            </div>
        </li>
    );
};

export default TodoListItem;
