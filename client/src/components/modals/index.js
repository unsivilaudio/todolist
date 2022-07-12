import React from 'react';
import AddTab from 'components/modals/AddTab';

import classes from 'styles/modals/ModalWindow.module.scss';

const ModalWindow = ({ show, onClose }) => {
    const windowClasses = [classes.ModalWindow];

    if (show) windowClasses.push(classes.Show);

    return (
        <div className={windowClasses.join(' ')}>
            <AddTab onClose={onClose} />
        </div>
    );
};

export default ModalWindow;
