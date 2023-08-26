import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';

import { ProgressBarLine } from '@components/ProgressBar/ProgressBarLine/ProgressBarLine';

import type { PropsWithClassname } from '@types';

import classes from './CompletedTaskCard.module.scss';

interface ICompletedTaskCard extends PropsWithClassname {
    title: string;
    percentage: number;
}

type CompletedTaskCardProps = ICompletedTaskCard & HTMLAttributes<HTMLElement>;

export const CompletedTaskCard: FC<CompletedTaskCardProps> = ({
    title,
    className,
    percentage,
    ...props
}): JSX.Element => {
    const rootClasses = cn(classes.card, className);

    return (
        <article {...props} className={rootClasses}>
            <h3>{title}</h3>
            <ProgressBarLine percentage={percentage} />
        </article>
    );
};
