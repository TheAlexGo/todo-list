import React, { FC, InputHTMLAttributes, JSX, useRef, useState } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { IInputCore, InputContainer } from '../InputContainer/InputContainer';

import classes from './Input.module.scss';

type TInput = InputHTMLAttributes<HTMLInputElement>;

export interface IInput extends IInputCore {
    icon?: Icons;
    value: string;
    onChange?: TInput['onChange'];
}

type TInputProps = IInput & TInput;

export const Input: FC<TInputProps> = ({
    id,
    className,
    wrapperClassName,
    containerClassName,
    type: _type,
    icon,
    title,
    error,
    isInvisibleTitle = false,
    ...props
}): JSX.Element => {
    const [type, setType] = useState(_type);
    const inputRef = useRef<HTMLInputElement>(null);

    const isPasswordInput = _type === 'password';

    const rootClasses = cn(
        classes['input'],
        {
            [classes['__is-password']]: isPasswordInput,
            [classes['__with-icon']]: icon,
        },
        className,
    );

    const leftIconClasses = cn(classes['icon'], classes['__is-left']);

    const rightIconClasses = cn(classes['icon'], classes['__is-right']);

    const clickEyeHandler = (): void => {
        setType((prevType) => {
            if (prevType === 'password') {
                return 'text';
            }
            return 'password';
        });
    };

    const renderEyeIcon = (): JSX.Element | null => {
        if (!isPasswordInput) {
            return null;
        }
        const isPasswordType = type === 'password';
        const icon = isPasswordType ? Icons.EYE : Icons.EYE_SLASH;
        const title = isPasswordType ? 'Показать пароль' : 'Скрыть пароль';
        return (
            <Button className={rightIconClasses} title={title} onClick={clickEyeHandler}>
                <Icon icon={icon} />
            </Button>
        );
    };

    return (
        <InputContainer
            id={id}
            wrapperClassName={wrapperClassName}
            containerClassName={containerClassName}
            title={title}
            isInvisibleTitle={isInvisibleTitle}
            error={error}
        >
            {icon && <Icon className={leftIconClasses} icon={icon} />}
            <input {...props} id={id} className={rootClasses} type={type} ref={inputRef} />
            {renderEyeIcon()}
        </InputContainer>
    );
};
