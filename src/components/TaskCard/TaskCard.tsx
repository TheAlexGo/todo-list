import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';

import { ProgressBarCircle } from '@components/ProgressBar/ProgressBarCircle/ProgressBarCircle';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { getTaskLink } from '@utils/routing';

import classes from './TaskCard.module.scss';

interface ITaskCard {
    id: string;
    title: string;
    date: Date;
    progress: number;
}

type TTaskProps = ITaskCard & HTMLAttributes<HTMLElement>;

export const TaskCard: FC<TTaskProps> = ({ id, title, date, progress, className, ...props }): JSX.Element => {
    const rootClasses = cn(classes.card, className);

    const taskLink = getTaskLink(id);

    return (
        <RoutingLink to={taskLink}>
            <article {...props} className={rootClasses}>
                <h3 className={classes.heading}>{title}</h3>
                <div className={classes.date}>
                    Сделать до: <br /> <time>{date.toLocaleString()}</time>
                </div>
                <div className={classes.progress}>
                    <ProgressBarCircle id={window.crypto.randomUUID()} percentage={progress} />
                </div>
            </article>
        </RoutingLink>
    );
};
