import React, { type FC, type JSX, type PropsWithChildren } from 'react';

import cn from 'classnames';

import classes from './InputContainer.module.scss';

export interface IInputCore extends PropsWithChildren {
    id: string;
    title: string;
    error: string;
    isInvisibleTitle?: boolean;
    wrapperClassName?: string;
    containerClassName?: string;
}

export const InputContainer: FC<IInputCore> = ({
    children,
    id,
    title,
    error,
    isInvisibleTitle = false,
    wrapperClassName,
    containerClassName,
}): JSX.Element => {
    const wrapperClasses = cn(classes.wrapper, wrapperClassName);
    const containerClasses = cn(classes['container-content'], containerClassName);
    const labelClasses = cn(classes.label, {
        [classes['__is-visible']]: isInvisibleTitle,
    });

    return (
        <div className={wrapperClasses}>
            <label htmlFor={id} className={labelClasses}>
                {title}
            </label>
            <div>
                <div className={containerClasses}>{children}</div>
                {error && <strong className={classes.error}>{error}</strong>}
            </div>
        </div>
    );
};
