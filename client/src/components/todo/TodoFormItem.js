import React, { useEffect, useState } from 'react';
import { useActions } from 'hooks/use-actions';

import classes from 'styles/todo/TodoFormItem.module.scss';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const TodoFormItem = ({ item, cancelEdit }) => {
    const [editContent, setEditContent] = useState('');
    const { updateTodo } = useActions();

    useEffect(() => {
        setEditContent(item.content);
    }, [item]);

    function handleChange(e) {
        setEditContent(e.target.value);
    }

    function handleEditSubmit() {
        if (editContent.trim() === '') return;
        item.content = editContent;
        updateTodo(item);
        cancelEdit(item._id);
    }

    return (
        <li className={classes.TodoFormItem}>
            <Input
                name='editContent'
                value={editContent}
                handleChange={handleChange}
                submitted={handleEditSubmit}
            />
            <Button label='save' clicked={handleEditSubmit} />
        </li>
    );
};

export default TodoFormItem;
