import React from 'react';

import classes from 'styles/ui/Button.module.scss';

const Button = props => {
    const btnClasses = [classes.Button];
    switch (props.theme?.toLowerCase()) {
        case 'transparent':
            btnClasses.push(classes.Transparent);
            break;
        case 'primary':
            btnClasses.push(classes.Primary);
            break;
        case 'secondary':
            btnClasses.push(classes.Secondary);
            break;
        case 'tertiary':
            btnClasses.push(classes.Tertiary);
            break;
        default:
            break;
    }

    return (
        <button
            className={btnClasses.join(' ')}
            onClick={props.clicked}
            disabled={props.disabled || false}
            type={props.btnType || 'button'}>
            {props.label}
        </button>
    );
};

export default Button;
