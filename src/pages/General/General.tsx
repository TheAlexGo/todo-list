import React, { type FC, type JSX, useEffect, useState } from 'react';

import { CompletedTaskCard } from '@components/CompletedTaskCard/CompletedTaskCard';
import { Greetings } from '@components/Greetings/Greetings';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { Slider } from '@components/Slider/Slider';
import { TaskCard } from '@components/TaskCard/TaskCard';
import { useAuth } from '@providers/AuthProvider';
import { readTasks } from '@services/api';

import { type ITask, Pages } from '@types';

import classes from './General.module.scss';

export const General: FC = (): JSX.Element => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const user = useAuth().user!;

    useEffect(() => {
        readTasks(user.userId).then(setTasks);
    }, [user.userId]);

    return (
        <>
            <Greetings title="Приветствие" />
            <main className={classes.content}>
                <Slider
                    heading="Завершённые задачи"
                    items={Array.from(Array(10).keys()).map((item) => ({ id: item }))}
                    itemClassName={classes['task-completed']}
                    renderItem={({ id }) => (
                        <RoutingLink to={`#${id}`}>
                            <CompletedTaskCard
                                className={classes['task-card']}
                                title="Real Estate Website Design"
                                percentage={id * 10}
                            />
                        </RoutingLink>
                    )}
                    moreLink={{ href: Pages.COMPLETED_TASKS, title: 'Все' }}
                    axis="x"
                />
                <Slider<ITask>
                    heading="В процессе"
                    items={tasks}
                    renderItem={(task) => <TaskCard {...task} />}
                    moreLink={{ href: Pages.IN_PROGRESS_TASKS, title: 'Все' }}
                    axis="y"
                />
            </main>
        </>
    );
};
