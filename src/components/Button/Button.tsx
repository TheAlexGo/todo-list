import React, { FC, ButtonHTMLAttributes } from 'react';

import cn from 'classnames';

import classes from './Button.module.scss';

export enum Buttons {
    CLEAN = 'clean',
    PRIMARY = 'primary',
    OUTLINE = 'outline',
}

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Buttons;
}

export const Button: FC<IButton> = ({ type = 'button', className, variant = Buttons.CLEAN, ...props }): JSX.Element => {
    const rootClasses = cn(
        classes['button'],
        {
            [classes[`__is-${variant}`]]: variant && variant !== Buttons.CLEAN,
        },
        className,
    );
    return <button {...props} className={rootClasses} type={type} />;
};
