import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/inputs/Input/Input';
import { PropsWithClassname } from '@types';

import classes from './LoginForm.module.scss';
import baseClasses from '../base/Base.module.scss';

interface ILoginForm {
    email: IInput;
    password: IInput;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: FC<PropsWithClassname<ILoginForm>> = ({ onSubmit, email, password, error }): JSX.Element => (
    <form className={baseClasses.form} onSubmit={onSubmit} method="POST">
        <Input {...email} type="email" wrapperClassName={classes['wrapper-email']} />
        <Input {...password} type="password" wrapperClassName={classes['wrapper-password']} />
        {error && <strong className={baseClasses.error}>{error}</strong>}
        <Button className={baseClasses.button} type="submit" variant={Buttons.PRIMARY}>
            Войти
        </Button>
    </form>
);
