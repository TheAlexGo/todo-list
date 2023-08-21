import { Checkbox, ICheckbox } from '@components/inputs/Checkbox/Checkbox';
import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/inputs/Input/Input';

import classesBase from '../base/Base.module.scss';

interface IRegistrationForm {
    className?: string;
    name: IInput;
    email: IInput;
    password: IInput;
    privacy: ICheckbox;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const RegistrationForm: FC<IRegistrationForm> = ({
    name,
    email,
    password,
    privacy,
    error,
    onSubmit,
}): JSX.Element => {
    return (
        <form className={classesBase['form']} onSubmit={onSubmit} method="POST">
            <Input {...name} type="text" className={classesBase['input']} />
            <Input {...email} type="email" className={classesBase['input']} />
            <Input {...password} type="password" className={classesBase['input']} />
            <Checkbox {...privacy} type="checkbox" className={classesBase['checkbox']} />
            {error && <strong className={classesBase['error']}>{error}</strong>}
            <Button className={classesBase['button']} type="submit" variant={Buttons.PRIMARY}>
                Зарегистрироваться
            </Button>
        </form>
    );
};
