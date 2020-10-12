import React from 'react';

import '../assets/stylesheets/app.css';
import TodoList from './list/TodoList';

const app = props => {
    return (
        <div className='App'>
            <TodoList />
        </div>
    );
};

export default app;
