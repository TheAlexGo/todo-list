import React, { type FC, type JSX } from 'react';

import { CompletedTaskCard } from '@components/CompletedTaskCard/CompletedTaskCard';
import { Greetings } from '@components/Greetings/Greetings';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { Slider } from '@components/Slider/Slider';
import { TaskCard } from '@components/TaskCard/TaskCard';

import { Pages } from '@types';

import classes from './General.module.scss';

export const General: FC = (): JSX.Element => (
    <>
        <Greetings title="Приветствие" />
        <main>
            <Slider
                heading="Завершённые задачи"
                items={Array.from(Array(10).keys()).map((item) => ({ id: item }))}
                itemClassName={classes['task-completed']}
                renderItem={({ id }) => (
                    <RoutingLink to="#">
                        <CompletedTaskCard
                            className={classes['task-card']}
                            title="Real Estate Website Design"
                            percentage={id * 10}
                        />
                    </RoutingLink>
                )}
                moreLink={{ href: Pages.COMPLETED_TASKS, title: 'Больше' }}
            />
            <TaskCard
                id={window.crypto.randomUUID()}
                title="Сделать проект DayTask"
                date={new Date(Date.now())}
                progress={25}
            />
        </main>
    </>
);
