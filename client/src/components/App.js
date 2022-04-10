import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import 'assets/stylesheets/app.scss';
import TodoList from 'components/list/TodoList';

const App = props => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/todo' exact element={<TodoList />} />
                <Route path='*' element={<Navigate to='/todo' />} />
            </Routes>
        </div>
    );
};

export default App;
