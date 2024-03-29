import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'hooks/use-controlled-form';
import { useActions } from 'hooks/use-actions';

import Loader from 'components/ui/Loader';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/auth/Login.module.scss';

const Login = ({ loading }) => {
    const { values, onChange } = useForm({ fields: ['userid', 'password'] });
    const { loginUser } = useActions();

    function handleSubmit(e) {
        e.preventDefault();
        loginUser(values);
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Header}>
                <div className={classes.Brand}>
                    Welcome Back to Todo<span>List!</span>
                </div>
                <div className={classes.Title}>Log In</div>
            </div>
            <form className={classes.Form} onSubmit={handleSubmit}>
                <div className={classes.FormGroup}>
                    <label htmlFor='userid'>User ID</label>
                    <Input
                        type='text'
                        name='userid'
                        disabled={loading}
                        placeholder='email/username'
                        handleChange={onChange}
                        value={values['userId']}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='password'>Password</label>
                    <Input
                        type='password'
                        name='password'
                        disabled={loading}
                        placeholder='password'
                        handleChange={onChange}
                        value={values['password']}
                    />
                </div>
                <Button
                    theme='transparent'
                    label={loading ? <Loader /> : 'Login'}
                    disabled={loading}
                    clicked={handleSubmit}
                />
                <p className={classes.HelpText}>
                    <Link to='/auth/register'>
                        Not a member yet? Register here.
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
