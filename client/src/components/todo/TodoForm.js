import React, { useState } from 'react';
import { useActions } from 'hooks/use-actions';

import Input from 'components/ui/Input';
import classes from 'styles/todo/TodoForm.module.scss';
import Button from 'components/ui/Button';

const TodoForm = props => {
    const { saveTodo } = useActions();
    const [content, setContent] = useState('');

    function handleChangeContent(e) {
        setContent(e.target.value);
    }

    function handleAddTodo() {
        if (content === '') return;
        saveTodo({ content });
        setContent('');
    }

    return (
        <div className={classes.TodoForm}>
            <h2 className={classes.InputHeader}>New Todo</h2>
            <div className={classes.AddForm} onSubmit={handleAddTodo}>
                <Input
                    handleChange={handleChangeContent}
                    value={content}
                    placeholder='Enter a new todo...'
                    submitted={handleAddTodo}
                />
                <Button label='add todo' clicked={handleAddTodo} />
            </div>
        </div>
    );
};

export default TodoForm;
