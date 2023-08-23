import React, { FC, InputHTMLAttributes, JSX, useRef, useState } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { Checkbox } from '../Checkbox/Checkbox';

import classes from './Input.module.scss';
import baseClasses from '../Base.module.scss';

type TInput = InputHTMLAttributes<HTMLInputElement>;

export interface IInput {
    icon?: Icons;
    title: string;
    value: string;
    error: string;
    onChange?: TInput['onChange'];
    wrapperClassname?: string;
}

type TInputProps = IInput & TInput;

export const Input: FC<TInputProps> = ({
    className,
    type: _type,
    icon,
    title,
    error,
    wrapperClassname,
    ...props
}): JSX.Element => {
    const [type, setType] = useState(_type);
    const inputRef = useRef<HTMLInputElement>(null);

    const isPasswordInput = _type === 'password';
    const isCheckboxInput = _type === 'checkbox';

    const wrapperClasses = cn(classes['wrapper'], wrapperClassname);

    const containerClasses = cn(classes['container-content'], className);

    const rootClasses = cn(classes['input'], {
        [classes['__is-password']]: isPasswordInput,
        [classes['__with-icon']]: icon,
    });

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

    if (isCheckboxInput) {
        return <Checkbox {...props} title={title} />;
    }

    return (
        <label className={wrapperClasses}>
            {title && <div className={classes['title']}>{title}</div>}
            <div className={containerClasses}>
                {icon && <Icon className={leftIconClasses} icon={icon} />}
                <input {...props} className={rootClasses} type={type} ref={inputRef} />
                {renderEyeIcon()}
            </div>
            {error && <strong className={baseClasses['error']}>{error}</strong>}
        </label>
    );
};
