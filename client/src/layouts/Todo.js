import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/use-actions';

import Card from 'components/ui/Card';
import TodoList from 'components/todo/TodoList';
import TodoForm from 'components/todo/TodoForm';
import TodoTabs from 'components/todo/TodoTabs';

import classes from 'styles/layouts/Todo.module.scss';

const Todo = props => {
    const { todos, auth } = useSelector(state => state);
    const { fetchTodos } = useActions();
    const [selectedCat, setSelectedCat] = useState('default');
    const categories = [
        ...new Set(['default', ...todos.map(x => x.category || 'default')]),
    ];

    useEffect(() => {
        if (auth.user && todos.length === 0) fetchTodos();
    }, [auth, fetchTodos, todos]);

    const todoData = useMemo(() => {
        return todos.filter(x => {
            if (selectedCat === 'default')
                return !x.category || x.category === 'default';
            return x.category === selectedCat;
        });
    }, [selectedCat, todos]);

    return (
        <Card>
            <div className={classes.Todo}>
                <h1 className={classes.Header}>
                    Todo <span>List!</span>
                </h1>
                <h3 className={classes.SubHeader}>
                    A Simple React Todo List App
                </h3>
                <hr />
                {auth.user && (
                    <TodoTabs
                        changeCategory={setSelectedCat}
                        categories={categories}
                    />
                )}
                <TodoList data={todoData} />
                <TodoForm category={selectedCat} user={auth.user} />
            </div>
        </Card>
    );
};

export default Todo;
