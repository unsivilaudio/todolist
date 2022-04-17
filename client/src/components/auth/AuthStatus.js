import React from 'react';

import { ReactComponent as RightFromBracket } from 'assets/images/right-from-bracket-solid.svg';

import classes from 'styles/auth/AuthStatus.module.scss';
import { useActions } from 'hooks/use-actions';

const AuthStatus = ({ user }) => {
    const { logoutUser } = useActions();

    function handleLogoutUser() {
        logoutUser();
    }

    return (
        <div className={classes.AuthStatus}>
            <p className={classes.User}>Logged in as {user.username}</p>
            <div className={classes.Logout} onClick={handleLogoutUser}>
                <RightFromBracket />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default AuthStatus;
