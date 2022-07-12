import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/use-actions';

import ModalWindow from 'components/modals';
import classes from 'styles/Modal.module.scss';

const Modal = props => {
    const [show, setShow] = useState(false);
    const { modals } = useSelector(state => state);
    const { closeModals } = useActions();

    useEffect(() => {
        if (Object.values(modals).some(val => val)) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [modals]);

    function closeModal() {
        closeModals();
    }

    return (
        <div className={[classes.Modal, show ? classes.Show : ''].join(' ')}>
            <div className={classes.Backdrop} onClick={closeModal}></div>
            <ModalWindow show={show} onClose={closeModal} />
        </div>
    );
};

export default Modal;
