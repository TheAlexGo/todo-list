import type { JSX, ButtonHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import cn from 'classnames';

import classes from './Button.module.scss';

export enum Buttons {
    CLEAN = 'clean',
    PRIMARY = 'primary',
    OUTLINE = 'outline',
}

export enum ButtonSizes {
    XL = 'xl',
    AUTO = 'auto',
}

interface IButton {
    view?: Buttons;
    size?: ButtonSizes;
    fullWidth?: boolean;
}

interface ButtonProps extends IButton, ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { type = 'button', className, view = Buttons.CLEAN, size = ButtonSizes.AUTO, fullWidth = false, ...props },
        ref,
    ): JSX.Element => {
        const rootClasses = cn(
            classes.button,
            {
                [classes[`__view-${view}`]]: view !== Buttons.CLEAN,
                [classes[`__size-${size}`]]: size,
                [classes[`__is-full_width`]]: fullWidth,
            },
            className,
        );
        return <button {...props} className={rootClasses} type={type} ref={ref} />;
    },
);
