import React, { FC, InputHTMLAttributes, JSX } from 'react';

import cn from 'classnames';

import { IInput } from '@components/inputs/Input/Input';
import { Icon, Icons } from '@components/Icon/Icon';

import classes from './Checkbox.module.scss';

export interface ICheckbox extends Omit<IInput, 'icon' | 'error' | 'value'> {
    isSelected?: boolean;
}

type TCheckboxProps = ICheckbox & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<TCheckboxProps> = ({ title, className, isSelected, ...props }): JSX.Element => {
    const icon = isSelected ? Icons.CHECKBOX_FILL : Icons.CHECKBOX_EMPTY;

    const rootClasses = cn(
        classes['wrapper'],
        {
            [classes['__is-checked']]: isSelected,
        },
        className,
    );

    return (
        <label className={rootClasses}>
            <Icon className={classes['icon']} icon={icon} size={24} />
            <input {...props} type="checkbox" className={classes['checkbox']} checked={isSelected} />
            {title}
        </label>
    );
};
