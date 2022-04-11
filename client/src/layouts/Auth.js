import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Card from 'components/ui/Card';
import classes from 'styles/layouts/Auth.module.scss';

const LazyLogin = lazy(() => import('components/auth/Login'));
const LazyRegister = lazy(() => import('components/auth/Register'));

const Loading = <h1>Loading...</h1>;

const Auth = props => {
    const { auth } = useSelector(state => state);
    const { user, token, loading } = auth;
    const navigate = useNavigate();

    useEffect(() => {
        if (token && user) {
            navigate('/todos', { replace: true });
        }
    }, [token, user, navigate]);

    return (
        <div className={classes.Auth}>
            <Card>
                <Routes>
                    <Route
                        exact
                        path='login'
                        element={
                            <Suspense fallback={Loading}>
                                <LazyLogin loading={loading} />
                            </Suspense>
                        }
                    />
                    <Route
                        exact
                        path='register'
                        element={
                            <Suspense fallback={Loading}>
                                <LazyRegister loading={loading} />
                            </Suspense>
                        }
                    />
                    <Route path='*' element={<Navigate to='/auth/login' />} />
                </Routes>
            </Card>
        </div>
    );
};

export default Auth;
