import React from 'react';

import Input from '../ui/Input';
import '../../assets/stylesheets/todoform.scss';

const todoForm = props => {
    return (
        <div className='TodoForm'>
            <h2 className='InputHeader'>New Todo</h2>
            <Input
                name='newTodo'
                handleChange={props.handleChange}
                value={props.todo}
                placeholder='Enter a new todo...'
                btnLabel='ADD TODO'
                submitted={props.handleNewTodo}
            />
        </div>
    );
};

export default todoForm;
