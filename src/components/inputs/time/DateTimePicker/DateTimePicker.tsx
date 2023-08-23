import React, { FC, JSX } from 'react';
import cn from 'classnames';

import { DatePicker, IDatePicker } from '@components/inputs/time/DatePicker/DatePicker';
import { ITimePicker, TimePicker } from '@components/inputs/time/TimePicker/TimePicker';
import { IInput } from '@components/inputs/Input/Input';

import classes from './DateTimePicker.module.scss';

interface IDateTimePicker extends Pick<IInput, 'wrapperClassName' | 'title'> {
    date: IDatePicker;
    time: ITimePicker;
}

export const DateTimePicker: FC<IDateTimePicker> = ({ date, time, title, wrapperClassName }): JSX.Element => {
    const rootClasses = cn(classes['wrapper'], wrapperClassName);

    return (
        <fieldset className={rootClasses}>
            <legend className={classes['title']}>{title}</legend>
            <div className={classes['container']}>
                <DatePicker {...date} isInvisibleTitle />
                <TimePicker {...time} isInvisibleTitle />
            </div>
        </fieldset>
    );
};
