import React, { FC, JSX, HTMLAttributes } from 'react';

import cn from 'classnames';

import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import classes from './TaskCard.module.scss';
import { RouterLink } from '@components/RouterLink/RouterLink';
import { Pages } from '@types';

interface ITaskCard {
    id: string;
    title: string;
    date: Date;
    progress: number;
}

type TTaskProps = ITaskCard & HTMLAttributes<HTMLDivElement>;

export const TaskCard: FC<TTaskProps> = ({ id, title, date, progress, className, ...props }): JSX.Element => {
    const rootClasses = cn(classes['card'], className);

    const taskLink = `${Pages.TASK}/${id}`;

    return (
        <RouterLink to={taskLink}>
            <article {...props} className={rootClasses}>
                <h3 className={classes['heading']}>{title}</h3>
                <div className={classes['date']}>
                    Сделать до: <br /> <time>{date.toLocaleString()}</time>
                </div>
                <div className={classes['progress']}>
                    <ProgressBar percentage={progress} />
                </div>
            </article>
        </RouterLink>
    );
};
