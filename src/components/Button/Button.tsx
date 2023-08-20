import React, { FC, ButtonHTMLAttributes } from 'react';

import cn from 'classnames';

import classes from './Button.module.scss';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    isClean?: boolean;
}

export const Button: FC<IButton> = ({ type = 'button', className, isClean = true, ...props }): JSX.Element => {
    const rootClasses = cn(
        classes['button'],
        {
            [classes['__is-clean']]: isClean,
        },
        className,
    );
    return <button {...props} className={rootClasses} type={type} />;
};
