import React from 'react';

import Card from 'components/ui/Card';
import TodoList from 'components/todo/TodoList';
import TodoForm from 'components/todo/TodoForm';

import classes from 'styles/layouts/Todo.module.scss';

const Todo = props => {
    return (
        <Card>
            <div className={classes.Todo}>
                <TodoList />
                <TodoForm />
            </div>
        </Card>
    );
};

export default Todo;
