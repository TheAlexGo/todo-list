import React, { FC, JSX } from 'react';

import cn from 'classnames';

import { IInput } from '@components/inputs/Input/Input';
import { Icon, Icons } from '@components/Icon/Icon';

import classes from './Checkbox.module.scss';

export interface ICheckbox extends Omit<IInput, 'icon' | 'error' | 'value'> {}

export const Checkbox: FC<ICheckbox> = ({ title, className, checked: isSelected, ...props }): JSX.Element => {
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
