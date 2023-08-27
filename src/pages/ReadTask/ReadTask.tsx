import React, { type FC, type JSX, useState } from 'react';

import { Await, Navigate, useLoaderData, useParams } from 'react-router-dom';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { Header } from '@components/Header/Header';
import { Icon, Icons } from '@components/Icon/Icon';
import { ProgressBarCircle } from '@components/ProgressBar/ProgressBarCircle/ProgressBarCircle';
import { SubTaskCard } from '@components/SubTaskCard/SubTaskCard';
import { type LoadTaskResult } from '@services/routing';
import { getUpdateTaskLink } from '@utils/routing';

import type { ISubTask, ITask, ParamRequired } from '@types';
import { Pages } from '@types';

import classes from './ReadTask.module.scss';

const Component: FC<ITask> = (task): JSX.Element | null => {
    const [taskData, setTaskData] = useState<ITask | null>(task);

    const changeSubtaskHandler = (currentSubtask: ISubTask) => {
        setTaskData((prevTaskData) => {
            if (!prevTaskData) {
                return null;
            }
            return {
                ...prevTaskData,
                subtasks: prevTaskData.subtasks.map((subtask) => {
                    if (subtask.id === currentSubtask.id) {
                        return {
                            ...subtask,
                            isCompleted: !subtask.isCompleted,
                        };
                    }
                    return subtask;
                }),
            };
        });
    };

    if (taskData === null) {
        return null;
    }

    const { id, title, description, date, time, subtasks } = taskData;

    const percentageForOneSubTask = 100 / subtasks.length;
    const currentPercentage = subtasks.reduce(
        (acc, { isCompleted }) => (isCompleted ? acc + percentageForOneSubTask : acc),
        0,
    );

    return (
        <>
            <Header
                page={Pages.READ_TASK}
                text="Подробности"
                action={{ icon: Icons.EDIT, href: getUpdateTaskLink(id), title: 'Редактировать' }}
            />
            <main className={classes.wrapper}>
                <h2 className={classes.heading}>{title}</h2>
                <div className={classes.date}>
                    <div className={classes.icon}>
                        <Icon icon={Icons.CALENDAR_REMOVE} />
                    </div>
                    <div>
                        <div className={classes['date-text']}>Сделать до</div>
                        <div className={classes['date-value']}>
                            <time>
                                {new Date(date).toLocaleDateString('ru', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                                , {time}
                            </time>
                        </div>
                    </div>
                </div>
                <div className={classes.description}>
                    <h3 className={classes['heading-h3']}>Описание задачи</h3>
                    <p>{description}</p>
                </div>
                <div className={classes.progress}>
                    <h3 className={classes['heading-h3']}>Прогресс</h3>
                    <div className={classes['progress-item']}>
                        <ProgressBarCircle id={`read-task_${id}`} percentage={currentPercentage} />
                    </div>
                </div>
                <div className={classes['subtask-container']}>
                    <h3 className={classes['heading-h3']}>Все подзадачи</h3>
                    <ol className={classes['subtask-list']}>
                        {subtasks.map((subtask) => (
                            <li key={subtask.id}>
                                <SubTaskCard {...subtask} onChange={changeSubtaskHandler} />
                            </li>
                        ))}
                    </ol>
                </div>
                <div className={classes['create-container']}>
                    <Button className={classes['create-button']} view={Buttons.PRIMARY} size={ButtonSizes.XL} fullWidth>
                        Добавить
                    </Button>
                </div>
            </main>
        </>
    );
};

export const ReadTask: FC = (): JSX.Element => {
    const { id: taskId } = useParams<ParamRequired<'id'>>();
    const { taskResponse } = useLoaderData() as LoadTaskResult;

    if (!taskId) {
        return <Navigate to={Pages.NOT_FOUND} />;
    }

    return (
        <Await resolve={taskResponse} errorElement={<Navigate to={Pages.NOT_FOUND} />}>
            {Component}
        </Await>
    );
};
