import React, { FC, JSX } from 'react';

import { Greetings } from '@components/Greetings/Greetings';
import { TaskCard } from '@components/TaskCard/TaskCard';
import { CompletedTaskCard } from '@components/CompletedTaskCard/CompletedTaskCard';

import classes from './General.module.scss';

export const General: FC = (): JSX.Element => {
    return (
        <>
            <Greetings />
            <ol className={classes['slider']}>
                {Array.from(Array(10).keys()).map((i) => (
                    <li className={classes['task-completed']} key={i}>
                        <CompletedTaskCard className={classes['task-card']} title="Real Estate Website Design" />
                    </li>
                ))}
            </ol>
            <TaskCard
                id={window.crypto.randomUUID()}
                title="Сделать проект DayTask"
                date={new Date(Date.now())}
                progress={25}
            />
        </>
    );
};
