import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/Input/Input';

import classes from './LoginForm.module.scss';

interface ILoginForm {
    className?: string;
    email: IInput;
    password: IInput;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: FC<ILoginForm> = ({ onSubmit, email, password }): JSX.Element => {
    return (
        <form className={classes['form']} onSubmit={onSubmit} method="POST">
            <Input {...email} type="email" className={classes['input-email']} />
            <Input {...password} type="password" className={classes['input-password']} />
            <Button className={classes['button']} variant={Buttons.PRIMARY}>
                Войти
            </Button>
        </form>
    );
};
