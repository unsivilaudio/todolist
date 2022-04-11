import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/use-actions';

import classes from 'styles/todo/TodoList.module.scss';
import Card from 'components/ui/Card';
import TodoListItem from 'components/todo/TodoListItem';
import TodoForm from 'components/todo/TodoForm';
import TodoFormItem from 'components/todo/TodoFormItem';

const TodoList = props => {
    const [editing, setEditing] = useState([]);
    const { todos } = useSelector(state => state);
    const { fetchTodos, updateTodo, deleteTodo } = useActions();

    useEffect(() => {
        function escapeEdit(e) {
            if (e.key === 'Escape') {
                setEditing([]);
            }
        }

        window.addEventListener('keydown', escapeEdit);

        return () => {
            window.removeEventListener('keydown', escapeEdit);
        };
    }, []);

    useEffect(() => {
        if (!todos.length) fetchTodos();
    }, [todos, fetchTodos]);

    function startEditTodo(id) {
        setEditing(st => st.concat(id));
    }

    function cancelEditTodo(id) {
        setEditing(st => st.filter(x => x !== id));
    }

    function handleRemoveTodo(id) {
        deleteTodo(id);
    }

    function toggleCompleted(item) {
        item = { ...item, isCompleted: !item.isCompleted };
        updateTodo(item);
    }

    const renderTodoItems = (items = []) => {
        return items.map((item, i) => {
            const { content, isCompleted } = item;
            const id = item._id;
            if (editing.includes(id)) {
                return (
                    <TodoFormItem
                        key={id}
                        item={item}
                        cancelEdit={cancelEditTodo.bind(null, id)}
                    />
                );
            }
            return (
                <TodoListItem
                    id={id}
                    key={id}
                    isCompleted={isCompleted}
                    content={content}
                    clicked={toggleCompleted.bind(null, item)}
                    deleteItem={handleRemoveTodo.bind(null, id)}
                    editItem={startEditTodo.bind(null, id)}>
                    {content}
                </TodoListItem>
            );
        });
    };

    return (
        <div className={classes.TodoList}>
            <h1 className={classes.Header}>
                Todo <span>List!</span>
            </h1>
            <h3 className={classes.SubHeader}>A Simple React Todo List App</h3>
            <hr />
            <ul className={classes.List}>{renderTodoItems(todos)}</ul>
        </div>
    );
};

export default TodoList;
