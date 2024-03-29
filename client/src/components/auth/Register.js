import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'hooks/use-controlled-form';
import { useActions } from 'hooks/use-actions';

import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Loader from 'components/ui/Loader';
import classes from 'styles/auth/Login.module.scss';

const Register = ({ loading }) => {
    const { values, onChange } = useForm({
        fields: ['username', 'email', 'password', 'passwordConfirm'],
    });
    const { registerUser } = useActions();

    function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;
        registerUser(values);
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Header}>
                <h1 className={classes.Brand}>
                    Welcome to Todo<span>List!</span>
                </h1>
                <h3 className={classes.Title}>Sign Up</h3>
            </div>

            <form className={classes.Form} onSubmit={handleSubmit}>
                <div className={classes.FormGroup}>
                    <label htmlFor='username'>Username</label>
                    <Input
                        type='text'
                        name='username'
                        disabled={loading}
                        placeholder='johnsmith123'
                        handleChange={onChange}
                        value={values['username']}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='email'>Email</label>
                    <Input
                        type='email'
                        name='email'
                        disabled={loading}
                        placeholder='john@smith.com'
                        handleChange={onChange}
                        value={values['email']}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='password'>Password</label>
                    <Input
                        type='password'
                        name='password'
                        disabled={loading}
                        handleChange={onChange}
                        value={values['password']}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                    <Input
                        type='password'
                        name='passwordConfirm'
                        disabled={loading}
                        handleChange={onChange}
                        value={values['passwordConfirm']}
                    />
                </div>
                <Button
                    theme='transparent'
                    label={loading ? <Loader /> : 'Sign Up'}
                    clicked={handleSubmit}
                    disabled={loading}
                />
                <p className={classes.HelpText}>
                    <Link to='/auth/login'>
                        Already registered? Log in here.
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
