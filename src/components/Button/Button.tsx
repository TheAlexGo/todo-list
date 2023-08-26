import React, { FC, JSX, ButtonHTMLAttributes } from 'react';

import cn from 'classnames';

import classes from './Button.module.scss';

export enum Buttons {
    CLEAN = 'clean',
    PRIMARY = 'primary',
    OUTLINE = 'outline',
}

interface IButton {
    variant?: Buttons;
}

interface ButtonProps extends IButton, ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({
    type = 'button',
    className,
    variant = Buttons.CLEAN,
    ...props
}): JSX.Element => {
    const rootClasses = cn(
        classes.button,
        {
            [classes[`__is-${variant}`]]: variant && variant !== Buttons.CLEAN,
        },
        className,
    );
    return <button {...props} className={rootClasses} type={type} />;
};
