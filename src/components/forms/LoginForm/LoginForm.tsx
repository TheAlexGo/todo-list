import React, { type FC, type FormEvent, type JSX } from 'react';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { Input } from '@components/inputs/Input/Input';

import type { PropsWithClassname } from '@types';

import type { IInput } from '@components/inputs/Input/Input';

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
        <Button className={baseClasses.button} type="submit" view={Buttons.PRIMARY} size={ButtonSizes.XL}>
            Войти
        </Button>
    </form>
);
