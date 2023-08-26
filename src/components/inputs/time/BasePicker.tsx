import React, { FC, InputHTMLAttributes, JSX } from 'react';

import cn from 'classnames';

import { IInput } from '@components/inputs/Input/Input';
import { Icon, Icons } from '@components/Icon/Icon';

import { InputContainer } from '@components/inputs/InputContainer/InputContainer';
import classes from './BasePicker.module.scss';

type TInput = InputHTMLAttributes<HTMLInputElement>;

export interface IBasePicker extends Omit<IInput, 'onChange'> {
    icon: Icons;
    onChange: TInput['onChange'];
    type: 'date' | 'time';
}

export type TTBasePickerProps = IBasePicker & TInput;

export const BasePicker: FC<TTBasePickerProps> = ({
    id,
    icon,
    error,
    title,
    isInvisibleTitle,
    wrapperClassName,
    containerClassName,
    ...props
}): JSX.Element => {
    const wrapperClasses = cn(classes.wrapper, wrapperClassName);
    const containerClasses = cn(classes['container-content'], containerClassName);

    return (
        <InputContainer
            id={id}
            wrapperClassName={wrapperClasses}
            containerClassName={containerClasses}
            title={title}
            isInvisibleTitle={isInvisibleTitle}
            error={error}
        >
            <div className={classes['wrapper-icon']}>
                <Icon icon={icon} size={24} />
            </div>
            <input {...props} id={id} className={classes.field} />
        </InputContainer>
    );
};
