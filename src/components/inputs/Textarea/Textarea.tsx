import React, { FC, JSX, TextareaHTMLAttributes } from 'react';

import cn from 'classnames';

import { IInput } from '@components/inputs/Input/Input';

import classes from './Textarea.module.scss';
import baseClasses from '../Base.module.scss';

type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface ITextarea extends Omit<IInput, 'icon' | 'onChange'> {
    onChange: TTextarea['onChange'];
}

type TTextareaProps = ITextarea & TTextarea;

export const Textarea: FC<TTextareaProps> = ({
    wrapperClassName,
    className,
    title,
    error,
    rows = 3,
    ...props
}): JSX.Element => {
    const wrapperClasses = cn(classes['wrapper'], wrapperClassName);

    return (
        <label className={wrapperClasses}>
            {title && <div className={classes['title']}>{title}</div>}
            <textarea {...props} rows={rows} className={cn(classes['textarea'], className)} />
            {error && <strong className={baseClasses['error']}>{error}</strong>}
        </label>
    );
};
