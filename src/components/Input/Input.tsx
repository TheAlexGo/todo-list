import React, { FC, InputHTMLAttributes, JSX, useRef, useState } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';

import classes from './Input.module.scss';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    icon: Icons;
    title: string;
    value: string;
    error: string;
}

export const Input: FC<IInput> = ({ className, type: _type, icon, title, error, ...props }): JSX.Element => {
    const [type, setType] = useState(_type);
    const inputRef = useRef<HTMLInputElement>(null);

    const isPasswordInput = _type === 'password';

    const rootClasses = cn(classes['input'], {
        [classes['__is-password']]: isPasswordInput,
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

    const renderTitle = (): JSX.Element | null => {
        if (!title) {
            return null;
        }
        return <div className={classes['title']}>{title}</div>;
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
        <label className={className}>
            {renderTitle()}
            <div className={classes['wrapper']}>
                <Icon className={leftIconClasses} icon={icon} />
                <input {...props} className={rootClasses} type={type} ref={inputRef} />
                {renderEyeIcon()}
            </div>
            {error && <strong className={classes['error']}>{error}</strong>}
        </label>
    );
};
