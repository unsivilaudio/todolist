import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/use-actions';

import { ToastContainer } from 'components/Toast';
import App from 'components/App';
import AuthStatus from 'components/auth/AuthStatus';
import 'react-toastify/dist/ReactToastify.css';

const Main = props => {
    const { token, user } = useSelector(state => state.auth);
    const { tokenLogin } = useActions();

    useEffect(() => {
        if (token && !user) {
            tokenLogin(token);
        }
    }, [tokenLogin, token, user]);

    return (
        <div className='Main'>
            <ToastContainer />
            <AuthStatus user={user} />
            <App user={user} />
        </div>
    );
};

export default Main;
