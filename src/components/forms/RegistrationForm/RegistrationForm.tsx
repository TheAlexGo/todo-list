import React, { type FC, type FormEvent, type JSX } from 'react';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { Checkbox } from '@components/inputs/Checkbox/Checkbox';
import { Input } from '@components/inputs/Input/Input';

import type { PropsWithClassname } from '@types';

import type { ICheckbox } from '@components/inputs/Checkbox/Checkbox';
import type { IInput } from '@components/inputs/Input/Input';

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
}): JSX.Element => (
    <form className={classesBase.form} onSubmit={onSubmit} method="POST">
        <Input {...name} type="text" wrapperClassName={classes['wrapper-name']} />
        <Input {...email} type="email" wrapperClassName={classes['wrapper-email']} />
        <Input {...password} type="password" wrapperClassName={classes['wrapper-password']} />
        <Checkbox {...privacy} type="checkbox" wrapperClassName={classes['wrapper-checkbox']} />
        {error && <strong className={classesBase.error}>{error}</strong>}
        <Button className={classesBase.button} type="submit" view={Buttons.PRIMARY} size={ButtonSizes.XL}>
            Зарегистрироваться
        </Button>
    </form>
);
