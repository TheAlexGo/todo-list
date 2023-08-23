import React, { FC, JSX, CSSProperties } from 'react';

import cn from 'classnames';

import classes from './ProgressBar.module.scss';

export enum ProgressBarSizes {
    M = '60',
}
interface IProgressBar {
    percentage: number;
    size?: ProgressBarSizes;
}

type ProgressBarCSSProperties = CSSProperties & {
    '--current_percentage': number;
};

export const ProgressBar: FC<IProgressBar> = ({ percentage, size = ProgressBarSizes.M }): JSX.Element => {
    const rootStyles: ProgressBarCSSProperties = {
        '--current_percentage': percentage,
    };

    const wrapperClasses = cn(classes['wrapper'], {
        [classes[`__is-size_${size}`]]: size,
    });

    return (
        <div className={wrapperClasses}>
            <div
                role="progressbar"
                className={classes['progress-bar']}
                style={rootStyles}
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-labelledby="progressBar-label"
            />
            <div id="progressBar-label" className={classes['label']}>
                {percentage}%
            </div>
        </div>
    );
};
