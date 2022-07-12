import React, { useState } from 'react';
import { ReactComponent as Edit } from 'assets/images/pencil-alt-solid.svg';
import { ReactComponent as Delete } from 'assets/images/trash-solid.svg';
import { ReactComponent as ChevronLeft } from 'assets/images/chevron-left-solid.svg';
import Button from 'components/ui/Button';

import classes from 'styles/todo/TodoListItem.module.scss';

const TodoListItem = props => {
    const { clicked, isCompleted, content, editItem, deleteItem } = props;
    const [mobileExpand, setMobileExpand] = useState(false);

    function toggleMobileExpand() {
        if (window.visualViewport.width > 580) return;
        setMobileExpand(st => !st);
    }

    function onContentClick(e) {
        e.stopPropagation();
        clicked();
    }

    let editBtn = <Edit />;
    let deleteBtn = <Delete />;

    if (mobileExpand) {
        editBtn = <Button label='edit' />;
        deleteBtn = <Button label='delete' />;
    }

    return (
        <li className={classes.TodoListItem}>
            <p
                onClick={toggleMobileExpand}
                className={[
                    classes.Content,
                    isCompleted ? classes.Done : '',
                    mobileExpand ? classes.Expand : '',
                ].join(' ')}>
                <span onClick={!mobileExpand ? onContentClick : null}>
                    {content}
                </span>
            </p>
            <div
                className={[
                    classes.Chevron,
                    mobileExpand ? classes.Expand : '',
                ].join(' ')}
                onClick={toggleMobileExpand}>
                <ChevronLeft fontSize='large' />
            </div>
            <div
                className={[
                    classes.Actions,
                    mobileExpand ? classes.Expand : '',
                ].join(' ')}>
                <span className={classes.Edit} onClick={editItem}>
                    {editBtn}
                </span>
                <span className={classes.Delete} onClick={deleteItem}>
                    {deleteBtn}
                </span>
            </div>
        </li>
    );
};

export default TodoListItem;
