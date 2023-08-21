import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/Input/Input';

import classes from '../base/Base.module.scss';

interface ILoginForm {
    className?: string;
    email: IInput;
    password: IInput;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: FC<ILoginForm> = ({ onSubmit, email, password, error }): JSX.Element => {
    return (
        <form className={classes['form']} onSubmit={onSubmit} method="POST">
            <Input {...email} type="email" className={classes['input']} />
            <Input {...password} type="password" className={classes['input']} />
            {error && <strong className={classes['error']}>{error}</strong>}
            <Button className={classes['button']} type="submit" variant={Buttons.PRIMARY}>
                Войти
            </Button>
        </form>
    );
};
