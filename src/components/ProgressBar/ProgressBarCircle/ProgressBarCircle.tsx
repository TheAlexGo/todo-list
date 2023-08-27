import React, { type FC, type JSX, type CSSProperties } from 'react';

import cn from 'classnames';

import classes from './ProgressBarCircle.module.scss';

export enum ProgressBarSizes {
    M = '60',
}
interface IProgressBar {
    id: string;
    percentage: number;
    size?: ProgressBarSizes;
}

type ProgressBarCSSProperties = CSSProperties & {
    '--current_percentage': number;
};

export const ProgressBarCircle: FC<IProgressBar> = ({ id, percentage, size = ProgressBarSizes.M }): JSX.Element => {
    const currentPercentage = +percentage.toFixed();

    const barId = `progressBar-label_${id}`;

    const rootStyles: ProgressBarCSSProperties = {
        '--current_percentage': currentPercentage,
    };

    const wrapperClasses = cn(classes.wrapper, {
        [classes[`__is-size_${size}`]]: size,
    });

    return (
        <div className={wrapperClasses}>
            <div
                role="progressbar"
                className={classes['progress-bar']}
                style={rootStyles}
                aria-valuenow={currentPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-labelledby={barId}
            />
            <div id={barId} className={classes.label}>
                {currentPercentage}%
            </div>
        </div>
    );
};
