import React from 'react';

import '../../assets/stylesheets/input.css';
import Button from './Button';

const customInput = props => {
    return (
        <div className='Input'>
            <input
                name={props.name}
                type={props.inputType || 'text'}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
            <Button label={props.btnLabel} />
        </div>
    );
};

export default customInput;
