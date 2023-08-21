import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/Input/Input';

import classesBase from '../base/Base.module.scss';

interface IRegistrationForm {
    className?: string;
    name: IInput;
    email: IInput;
    password: IInput;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const RegistrationForm: FC<IRegistrationForm> = ({ name, email, password, error, onSubmit }): JSX.Element => {
    return (
        <form className={classesBase['form']} onSubmit={onSubmit} method="POST">
            <Input {...name} type="text" className={classesBase['input']} />
            <Input {...email} type="email" className={classesBase['input']} />
            <Input {...password} type="password" className={classesBase['input']} />
            {error && <strong className={classesBase['error']}>{error}</strong>}
            <Button className={classesBase['button']} type="submit" variant={Buttons.PRIMARY}>
                Зарегистрироваться
            </Button>
        </form>
    );
};
