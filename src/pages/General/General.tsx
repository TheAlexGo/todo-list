import React, { type FC, type JSX, useEffect, useState } from 'react';

import { CompletedTaskCard } from '@components/CompletedTaskCard/CompletedTaskCard';
import { Greetings } from '@components/Greetings/Greetings';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { Slider } from '@components/Slider/Slider';
import { TaskCard } from '@components/TaskCard/TaskCard';
import { useAuth } from '@providers/AuthProvider';
import { readTasks } from '@services/api';
import { calculateCurrentPercentage } from '@utils/task';

import { type ITask, Pages } from '@types';

import classes from './General.module.scss';

/**
 * Чтобы у пользователя не было неприятного мерцания, сделаем задержку загрузки хотя бы в полсекунды
 */
const LOADING_DELAY = 500;

export const General: FC = (): JSX.Element => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useAuth().user!;

    const renderPlaceholder = (): JSX.Element => (
        <div className={classes.placeholder}>
            <span>Кажется, у вас нет задач =)</span>
            <RoutingLink to={Pages.CREATE_TASK} className={classes.link}>
                Создадим?
            </RoutingLink>
        </div>
    );

    const deleteHandler = (currentTask: ITask) => {
        setTasks((prevTaskData) => prevTaskData.filter((task) => task.id !== currentTask.id));
    };

    useEffect(() => {
        readTasks(user.userId)
            .then((currentTasks) => {
                setTimeout(() => {
                    setTasks(currentTasks);
                    setIsLoading(false);
                }, LOADING_DELAY);
            })
            .catch(() => setTimeout(() => setIsLoading(false), LOADING_DELAY));
    }, [user.userId]);

    return (
        <>
            <Greetings title="Приветствие" />
            <main className={classes.content}>
                <Slider
                    heading="Завершённые задачи"
                    items={tasks.filter((task) => calculateCurrentPercentage(task.subtasks) === 100)}
                    itemClassName={classes['task-completed']}
                    renderItem={(task) => <CompletedTaskCard {...task} className={classes['task-card']} />}
                    axis="x"
                    isLoading={isLoading}
                />
                <Slider<ITask>
                    heading="В процессе"
                    items={tasks}
                    renderItem={(task) => <TaskCard {...task} onDelete={deleteHandler} />}
                    placeholder={renderPlaceholder()}
                    axis="y"
                    isLoading={isLoading}
                />
            </main>
        </>
    );
};
