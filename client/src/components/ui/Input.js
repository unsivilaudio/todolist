import React from 'react';

import classes from 'styles/ui/Input.module.scss';

const Input = ({ submitted, name, type, value, handleChange, placeholder }) => {
    function onEnterSubmit(e) {
        if (e.key === 'Enter') {
            submitted();
        }
    }

    return (
        <input
            className={classes.Input}
            name={name}
            type={type || 'text'}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            onKeyPress={onEnterSubmit}
        />
    );
};

export default Input;
