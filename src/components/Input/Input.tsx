import { Button } from '@components/Button/Button';
import React, { FC, InputHTMLAttributes, JSX, useRef, useState } from 'react';
import { Icon, Icons } from '@components/Icon/Icon';

import cn from 'classnames';

import classes from './Input.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    icon: Icons;
    title: string;
}

export const Input: FC<IInput> = ({ className, type: _type, icon, title, ...props }): JSX.Element => {
    const [type, setType] = useState(_type);
    const inputRef = useRef<HTMLInputElement>(null);

    const isPasswordInput = _type === 'password';

    const rootClasses = cn(
        classes['input'],
        {
            [classes['__is-password']]: isPasswordInput,
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
        const icon = isPasswordType ? Icons.Eye : Icons.EyeSlash;
        const title = isPasswordType ? 'Показать пароль' : 'Скрыть пароль';
        return (
            <Button className={rightIconClasses} title={title}>
                <Icon icon={icon} onClick={clickEyeHandler} />
            </Button>
        );
    };

    return (
        <label>
            {renderTitle()}
            <div className={classes['wrapper']}>
                <Icon className={leftIconClasses} icon={icon} />
                <input {...props} className={rootClasses} type={type} ref={inputRef} />
                {renderEyeIcon()}
            </div>
        </label>
    );
};
