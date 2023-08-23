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
    const rootClasses = cn(wrapperClassName);

    return (
        <label className={rootClasses}>
            <div className={classes['title']}>{title}</div>
            <div className={classes['container']}>
                <DatePicker {...date} />
                <TimePicker {...time} />
            </div>
        </label>
    );
};
