import React from 'react';

import classes from 'styles/ui/Button.module.scss';

const Button = props => {
    return (
        <button
            className={classes.Button}
            onClick={props.clicked}
            type={props.btnType || 'button'}>
            {props.label}
        </button>
    );
};

export default Button;
