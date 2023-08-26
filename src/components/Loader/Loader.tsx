import React, { type FC, type JSX } from 'react';

import cn from 'classnames';

import type { PropsWithClassname } from '@types';

import classes from './Loader.module.scss';

export enum LoaderSizes {
    M = '24',
    L = '80',
    XL = '160',
}

interface ILoader {
    label?: string;
    size?: LoaderSizes;
    isFixedOnCenter?: boolean;
}

export const Loader: FC<PropsWithClassname<ILoader>> = ({
    size = LoaderSizes.M,
    label = 'Идёт загрузка. Пожалуйста, подождите',
    isFixedOnCenter = false,
}): JSX.Element => {
    const rootClasses = cn(classes.loader, classes[`__is-size_${size}`], {
        [classes['__is-fixed_on-center']]: isFixedOnCenter,
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
