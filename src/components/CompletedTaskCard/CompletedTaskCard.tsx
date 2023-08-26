import React, { FC, JSX } from 'react';

import cn from 'classnames';

import { ProgressBarLine } from '@components/ProgressBar/components/ProgressBarLine/ProgressBarLine';
import { PropsWithClassname } from '@types';

import classes from './CompletedTaskCard.module.scss';

interface ICompletedTaskCard extends PropsWithClassname {
    title: string;
}

export const CompletedTaskCard: FC<ICompletedTaskCard> = ({ title, className }): JSX.Element => {
    const rootClasses = cn(classes.card, className);

    return (
        <article className={rootClasses}>
            <h3>{title}</h3>
            <ProgressBarLine percentage={36} />
        </article>
    );
};
