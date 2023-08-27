import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';

import { ProgressBarCircle } from '@components/ProgressBar/ProgressBarCircle/ProgressBarCircle';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { getTaskLink } from '@utils/routing';
import { calculateCurrentPercentage } from '@utils/task';

import { type ITask } from '@types';

import classes from './TaskCard.module.scss';

interface ITaskCard extends ITask {}

type TTaskProps = ITaskCard & HTMLAttributes<HTMLElement>;

export const TaskCard: FC<TTaskProps> = ({
    id,
    title,
    description,
    date,
    time,
    className,
    subtasks,
    ...props
}): JSX.Element => {
    const currentPercentage = calculateCurrentPercentage({
        id,
        title,
        description,
        date,
        time,
        subtasks,
    });

    const rootClasses = cn(classes.card, className);

    const taskLink = getTaskLink(id);

    return (
        <RoutingLink to={taskLink}>
            <article {...props} className={rootClasses}>
                <h3 className={classes.heading}>{title}</h3>
                <div className={classes.date}>
                    Сделать до: <br /> <time>{date}</time>
                </div>
                <div className={classes.progress}>
                    <ProgressBarCircle id={`progress-${id}`} percentage={currentPercentage} />
                </div>
            </article>
        </RoutingLink>
    );
};
