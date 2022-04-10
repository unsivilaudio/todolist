import React from 'react';

import '../../assets/stylesheets/formitem.scss';
import Input from '../ui/Input';

const formItem = props => {
    return (
        <li className='FormItem'>
            <Input
                name='editTodo'
                value={props.value}
                handleChange={props.handleChange}
                btnLabel='SAVE'
                submitted={props.handleSubmit}
            />
        </li>
    );
};

export default formItem;
