import React, { FC, FormEvent, JSX } from 'react';

import { IInput, Input } from '@components/inputs/Input/Input';
import { Button, Buttons } from '@components/Button/Button';
import { ITextarea, Textarea } from '@components/inputs/Textarea/Textarea';
import { DatePicker, IDatePicker } from '@components/inputs/time/DatePicker/DatePicker';
import { ITimePicker, TimePicker } from '@components/inputs/time/TimePicker/TimePicker';
import { PropsWithClassname } from '@types';

import classes from './CreateTaskForm.module.scss';
import baseClasses from '../base/Base.module.scss';
import cn from 'classnames';

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
    return (
        <form className={baseClasses['form']} onSubmit={onSubmit} method="POST">
            <Input {...title} type="text" wrapperClassname={cn(baseClasses['wrapper-input'], classes['title'])} />
            <Textarea {...description} className={cn(classes['textarea'], classes['title'])} />
            <label className={cn(classes['time'], classes['title'])}>
                <div className={classes['time-title']}>Введите дату и время</div>
                <div className={classes['container-time']}>
                    <DatePicker {...date} id="date-picker" className={classes['date']} />
                    <TimePicker {...time} className={classes['time']} />
                </div>
            </label>
            {error && <strong className={baseClasses['error']}>{error}</strong>}
            <Button className={baseClasses['button']} type="submit" variant={Buttons.PRIMARY}>
                Создать
            </Button>
        </form>
    );
};
