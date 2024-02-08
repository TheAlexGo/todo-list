import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';

import { ProgressBarLine } from '@components/ProgressBar/ProgressBarLine/ProgressBarLine';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { getTaskLink } from '@utils/routing';

import type { ITask } from '@types';

import classes from './CompletedTaskCard.module.scss';

interface ICompletedTaskCard extends ITask {}

type CompletedTaskCardProps = ICompletedTaskCard & HTMLAttributes<HTMLElement>;

export const CompletedTaskCard: FC<CompletedTaskCardProps> = ({ id, title, className, ...props }): JSX.Element => {
    const rootClasses = cn(classes.card, className);

    return (
        <RoutingLink to={getTaskLink(id)}>
            <article {...props} className={rootClasses}>
                <h3>{title}</h3>
                <ProgressBarLine percentage={100} />
            </article>
        </RoutingLink>
    );
};
