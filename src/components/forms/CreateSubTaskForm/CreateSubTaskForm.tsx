import React, { type FC, type JSX, type FormEvent } from 'react';

import cn from 'classnames';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { type IInput, Input } from '@components/inputs/Input/Input';
import { type ITextarea, Textarea } from '@components/inputs/Textarea/Textarea';

import classes from './CreateSubTaskForm.module.scss';
import baseClasses from '../base/Base.module.scss';

interface ICreateSubTaskForm {
    title: IInput;
    description: ITextarea;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateSubTaskForm: FC<ICreateSubTaskForm> = ({ title, description, error, onSubmit }): JSX.Element => {
    const rootClasses = cn(baseClasses.form, classes.form);

    return (
        <form className={rootClasses} onSubmit={onSubmit} method="POST">
            <div>
                <Input {...title} type="text" wrapperClassName={cn(classes['wrapper-title'], classes.title)} />
                <Textarea {...description} wrapperClassName={cn(classes['wrapper-textarea'], classes.title)} />
                {error && <strong className={baseClasses.error}>{error}</strong>}
            </div>
            <Button type="submit" view={Buttons.PRIMARY} size={ButtonSizes.XL}>
                Создать
            </Button>
        </form>
    );
};