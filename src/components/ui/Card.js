import React from 'react';

import '../../assets/stylesheets/card.css';

const card = props => {
    return <div className='Card'>{props.children}</div>;
};

export default card;
