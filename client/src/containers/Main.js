import React from 'react';

import { ToastContainer } from 'components/Toast';
import App from 'components/App';
import 'react-toastify/dist/ReactToastify.css';

const Main = props => {
    return (
        <div className='Main'>
            <ToastContainer />
            <App />
        </div>
    );
};

export default Main;
