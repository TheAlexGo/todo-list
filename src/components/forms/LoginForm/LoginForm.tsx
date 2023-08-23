import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/inputs/Input/Input';

import baseClasses from '../base/Base.module.scss';
import { PropsWithClassname } from '@types';

interface ILoginForm {
    email: IInput;
    password: IInput;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: FC<PropsWithClassname<ILoginForm>> = ({ onSubmit, email, password, error }): JSX.Element => {
    return (
        <form className={baseClasses['form']} onSubmit={onSubmit} method="POST">
            <Input {...email} type="email" wrapperClassname={baseClasses['wrapper-input']} />
            <Input {...password} type="password" wrapperClassname={baseClasses['wrapper-input']} />
            {error && <strong className={baseClasses['error']}>{error}</strong>}
            <Button className={baseClasses['button']} type="submit" variant={Buttons.PRIMARY}>
                Войти
            </Button>
        </form>
    );
};
