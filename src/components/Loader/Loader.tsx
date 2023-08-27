import React, { type FC, type JSX } from 'react';

import cn from 'classnames';

import type { PropsWithClassname } from '@types';

import classes from './Loader.module.scss';

export enum LoaderSizes {
    M = '24',
    L = '80',
    XL = '160',
}

export enum LoaderPositions {
    FIXED_ON_CENTER = 'fixed_on-center',
    STATIC_ON_CENTER = 'static_on-center',
    DEFAULT = 'default',
}

interface ILoader {
    label?: string;
    size?: LoaderSizes;
    position?: LoaderPositions;
}

export const Loader: FC<PropsWithClassname<ILoader>> = ({
    size = LoaderSizes.M,
    label = 'Идёт загрузка. Пожалуйста, подождите...',
    position = LoaderPositions.DEFAULT,
}): JSX.Element => {
    const rootClasses = cn(classes.loader, classes[`__is-size_${size}`], {
        [classes[`__is-${position}`]]: position !== LoaderPositions.DEFAULT,
    });

    return (
        <div className={rootClasses} role="status" aria-label={label}>
            <div className={classes.wrapper}>
                {Array.from(Array(3).keys()).map((i) => (
                    <div key={i} className={classes.indicator} />
                ))}
            </div>
        </div>
    );
};
