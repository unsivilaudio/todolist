import React from 'react';

import '../../assets/stylesheets/card.scss';

const card = props => {
    return <div className='Card'>{props.children}</div>;
};

export default card;
