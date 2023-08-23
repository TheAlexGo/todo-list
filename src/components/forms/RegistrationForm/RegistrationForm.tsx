import { Checkbox, ICheckbox } from '@components/inputs/Checkbox/Checkbox';
import React, { FC, FormEvent, JSX } from 'react';

import { Button, Buttons } from '@components/Button/Button';
import { IInput, Input } from '@components/inputs/Input/Input';
import { PropsWithClassname } from '@types';

import classes from './RegistrationForm.module.scss';
import classesBase from '../base/Base.module.scss';

interface IRegistrationForm {
    name: IInput;
    email: IInput;
    password: IInput;
    privacy: ICheckbox;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const RegistrationForm: FC<PropsWithClassname<IRegistrationForm>> = ({
    name,
    email,
    password,
    privacy,
    error,
    onSubmit,
}): JSX.Element => {
    return (
        <form className={classesBase['form']} onSubmit={onSubmit} method="POST">
            <Input {...name} type="text" wrapperClassName={classes['wrapper-name']} />
            <Input {...email} type="email" wrapperClassName={classes['wrapper-email']} />
            <Input {...password} type="password" wrapperClassName={classes['wrapper-password']} />
            <Checkbox {...privacy} type="checkbox" wrapperClassName={classes['wrapper-checkbox']} />
            {error && <strong className={classesBase['error']}>{error}</strong>}
            <Button className={classesBase['button']} type="submit" variant={Buttons.PRIMARY}>
                Зарегистрироваться
            </Button>
        </form>
    );
};
