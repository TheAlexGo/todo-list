import React, { type FC, type JSX, type FormEvent } from 'react';

import cn from 'classnames';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { Textarea } from '@components/inputs/Textarea/Textarea';

import type { ITextarea } from '@components/inputs/Textarea/Textarea';

import classes from './CreateSubTaskForm.module.scss';
import baseClasses from '../base/Base.module.scss';

interface ICreateSubTaskForm {
    title: ITextarea;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    buttonText: string;
}

export const CreateSubTaskForm: FC<ICreateSubTaskForm> = ({ title, error, onSubmit, buttonText }): JSX.Element => {
    const rootClasses = cn(baseClasses.form, classes.form);

    return (
        <form className={rootClasses} onSubmit={onSubmit} method="POST">
            <div>
                <Textarea {...title} wrapperClassName={cn(classes['wrapper-title'], classes.title)} />
                {error && <strong className={baseClasses.error}>{error}</strong>}
            </div>
            <Button type="submit" view={Buttons.PRIMARY} size={ButtonSizes.XL}>
                {buttonText}
            </Button>
        </form>
    );
};
