import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import classes from 'styles/App.module.scss';
import Todo from 'layouts/Todo';

const App = props => {
    return (
        <div className={classes.App}>
            <Routes>
                <Route path='/todo' exact element={<Todo />} />
                <Route path='*' element={<Navigate to='/todo' />} />
            </Routes>
        </div>
    );
};

export default App;
