import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/use-actions';

import classes from 'styles/todo/TodoList.module.scss';
import TodoListItem from 'components/todo/TodoListItem';
import TodoFormItem from 'components/todo/TodoFormItem';
import { Link } from 'react-router-dom';

const TodoList = ({ data }) => {
    const [editing, setEditing] = useState([]);
    const { auth } = useSelector(state => state);
    const { updateTodo, deleteTodo } = useActions();

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

    const notifyAuth = (
        <div className={classes.AuthCTA}>
            <div className={classes.Title}>Please Login To Get Started</div>
            <p className={classes.Actions}>
                <Link to='/auth/login'>Login</Link>
            </p>
        </div>
    );

    return (
        <div className={classes.TodoList}>
            <ul className={classes.List}>
                {!auth.user ? notifyAuth : renderTodoItems(data)}
            </ul>
        </div>
    );
};

export default TodoList;
