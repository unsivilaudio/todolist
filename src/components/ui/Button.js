import React from 'react';

import '../../assets/stylesheets/button.scss';

const customButton = props => {
    return (
        <button
            className='Button'
            onClick={props.clicked}
            type={props.btnType || 'button'}>
            {props.label}
        </button>
    );
};

export default customButton;
