import React from 'react';
import { toast, ToastContainer as Container } from 'react-toastify';

function toastMessage({
    message,
    type = 'success',
    position = toast.POSITION.BOTTOM_RIGHT,
    autoClose = 3000,
}) {
    toast[type](message, { position, autoClose });
}

export const ToastContainer = props => {
    return <Container />;
};

export default toastMessage;
