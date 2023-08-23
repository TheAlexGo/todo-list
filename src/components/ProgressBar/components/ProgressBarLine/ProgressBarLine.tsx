import React, { FC, JSX, ProgressHTMLAttributes, CSSProperties } from 'react';

import classes from './ProgressBarLine.module.scss';

interface IProgressBarLine extends ProgressHTMLAttributes<HTMLProgressElement> {
    percentage: number;
}

type ProgressBarLineCSSProperties = CSSProperties & {
    '--current_percentage': number;
};

export const ProgressBarLine: FC<IProgressBarLine> = ({ percentage, ...props }): JSX.Element => {
    const progressStyles: ProgressBarLineCSSProperties = {
        '--current_percentage': percentage,
    };

    return (
        <div>
            <div className={classes['values']}>
                <div className={classes['status-text']}>{percentage !== 100 ? 'В процессе...' : 'Завершено!'}</div>
                <div className={classes['status-value']}>{percentage}%</div>
            </div>
            <div className={classes['container']} style={progressStyles}>
                <progress {...props} className={classes['progress']} max={100} value={100} />
            </div>
        </div>
    );
};
