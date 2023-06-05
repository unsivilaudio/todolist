import React from 'react';

import classes from 'styles/ui/Card.module.scss';

const Card = props => {
    return (
        <div className={classes.Card} {...props}>
            {props.children}
        </div>
    );
};

export default Card;
