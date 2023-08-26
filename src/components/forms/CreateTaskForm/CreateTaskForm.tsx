import React, { type FC, type FormEvent, type JSX } from 'react';

import cn from 'classnames';

import { Button, Buttons } from '@components/Button/Button';
import { Input } from '@components/inputs/Input/Input';
import { Textarea } from '@components/inputs/Textarea/Textarea';
import { DateTimePicker } from '@components/inputs/time/DateTimePicker/DateTimePicker';

import type { PropsWithClassname } from '@types';

import type { IInput } from '@components/inputs/Input/Input';
import type { ITextarea } from '@components/inputs/Textarea/Textarea';
import type { IDatePicker } from '@components/inputs/time/DatePicker/DatePicker';
import type { ITimePicker } from '@components/inputs/time/TimePicker/TimePicker';

import classes from './CreateTaskForm.module.scss';
import baseClasses from '../base/Base.module.scss';

interface ICreateTaskForm {
    title: IInput;
    description: ITextarea;
    date: IDatePicker;
    time: ITimePicker;
    error: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateTaskForm: FC<PropsWithClassname<ICreateTaskForm>> = ({
    title,
    description,
    date,
    time,
    error,
    onSubmit,
}): JSX.Element => {
    const rootClasses = cn(baseClasses.form, classes.form);

    return (
        <form className={rootClasses} onSubmit={onSubmit} method="POST">
            <div>
                <Input {...title} type="text" wrapperClassName={cn(classes['wrapper-title'], classes.title)} />
                <Textarea {...description} wrapperClassName={cn(classes['wrapper-textarea'], classes.title)} />
                <DateTimePicker
                    date={date}
                    time={time}
                    title="Введите дату и время"
                    wrapperClassName={cn(classes['wrapper-time'], classes.title)}
                />
                {error && <strong className={baseClasses.error}>{error}</strong>}
            </div>
            <Button className={baseClasses.button} type="submit" variant={Buttons.PRIMARY}>
                Создать
            </Button>
        </form>
    );
};
