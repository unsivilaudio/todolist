import React from 'react';

import '../../assets/stylesheets/listitem.css';

const listItem = props => {
    return (
        <li className='ListItem'>
            <div className={`Content ${props.completed ? 'Done' : null}`}>
                {props.children}
            </div>
            <div className='Actions'>
                <span className='Edit'>EDIT</span>
                <span className='Delete'>DELETE</span>
            </div>
        </li>
    );
};

export default listItem;
