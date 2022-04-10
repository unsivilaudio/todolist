import React from 'react';

import { Delete, Edit } from '@material-ui/icons';
import '../../assets/stylesheets/listitem.scss';

const listItem = props => {
    return (
        <li className='ListItem'>
            <div
                className={`Content ${props.completed ? 'Done' : null}`}
                onClick={props.clicked}>
                {props.children}
            </div>
            <div className='Actions'>
                <span className='Edit' onClick={props.editItem}>
                    <Edit style={{ fontSize: 'inherit' }} />
                </span>
                <span className='Delete' onClick={props.deleteItem}>
                    <Delete style={{ fontSize: 'inherit' }} />
                </span>
            </div>
        </li>
    );
};

export default listItem;
