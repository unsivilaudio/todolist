import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import classes from 'styles/App.module.scss';
import TodoList from 'components/todo/TodoList';

const App = props => {
    return (
        <div className={classes.App}>
            <Routes>
                <Route path='/todo' exact element={<TodoList />} />
                <Route path='*' element={<Navigate to='/todo' />} />
            </Routes>
        </div>
    );
};

export default App;
