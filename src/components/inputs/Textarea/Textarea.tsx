import React, { type FC, type JSX, type TextareaHTMLAttributes } from 'react';

import cn from 'classnames';

import { InputContainer } from '@components/inputs/InputContainer/InputContainer';

import type { IInput } from '@components/inputs/Input/Input';

import classes from './Textarea.module.scss';

type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface ITextarea extends Omit<IInput, 'icon' | 'onChange'> {
    onChange: TTextarea['onChange'];
}

type TTextareaProps = ITextarea & TTextarea;

export const Textarea: FC<TTextareaProps> = ({
    id,
    className,
    wrapperClassName,
    containerClassName,
    title,
    isInvisibleTitle,
    error,
    rows = 3,
    ...props
}): JSX.Element => {
    const wrapperClasses = cn(classes.wrapper, wrapperClassName);

    return (
        <InputContainer
            id={id}
            wrapperClassName={wrapperClasses}
            containerClassName={containerClassName}
            title={title}
            isInvisibleTitle={isInvisibleTitle}
            error={error}
        >
            <textarea {...props} id={id} rows={rows} className={cn(classes.textarea, className)} />
        </InputContainer>
    );
};
