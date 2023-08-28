import React, { type FC, type JSX, useEffect, useState } from 'react';

import { Await, Navigate, useLoaderData, useParams } from 'react-router-dom';

import { Buttons, ButtonSizes } from '@components/Button/Button';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { Header } from '@components/Header/Header';
import { Icon, Icons } from '@components/Icon/Icon';
import { ProgressBarCircle } from '@components/ProgressBar/ProgressBarCircle/ProgressBarCircle';
import { SubTaskCard } from '@components/SubTaskCard/SubTaskCard';
import { updateSubTask } from '@services/api';
import { type LoadTaskResult } from '@services/routing';
import { getCreateSubTaskLink, getUpdateTaskLink } from '@utils/routing';
import { calculateCurrentPercentage } from '@utils/task';

import type { ISubTask, ITask, ParamRequired } from '@types';
import { Pages } from '@types';

import classes from './ReadTask.module.scss';

const UPDATE_DELAY = 1000;

const Component: FC<ITask> = (task): JSX.Element | null => {
    const [taskData, setTaskData] = useState<ITask | null>(task);
    const [subTasks, setSubTasks] = useState<ISubTask[]>([]);

    const changeSubTaskHandler = (currentSubTask: ISubTask) => {
        setSubTasks((prevSubTasks) =>
            prevSubTasks.map((subTask) => {
                if (subTask.id === currentSubTask.id) {
                    return {
                        ...subTask,
                        isDisabled: true,
                    };
                }
                return subTask;
            }),
        );

        const newData: ISubTask = {
            ...currentSubTask,
            isCompleted: !currentSubTask.isCompleted,
        };

        updateSubTask(newData, currentSubTask.id).then((result) => {
            if (result) {
                setTimeout(() => {
                    setSubTasks((prevSubTasks) =>
                        prevSubTasks
                            .map((subTask) => {
                                if (subTask.id === currentSubTask.id) {
                                    return {
                                        ...subTask,
                                        isCompleted: !subTask.isCompleted,
                                        isDisabled: false,
                                    };
                                }
                                return subTask;
                            })
                            .sort((subTask) => (subTask.isCompleted ? 1 : -1)),
                    );
                }, UPDATE_DELAY);
            }
        });
    };

    const deleteSubTaskHandler = (currentSubTask: ISubTask) => {
        setTaskData((prevTaskData) => {
            if (!prevTaskData) {
                return null;
            }
            return {
                ...prevTaskData,
                subtasks: prevTaskData.subtasks.filter((subTask) => subTask.id !== currentSubTask.id),
            };
        });
    };

    useEffect(() => {
        if (!taskData) {
            return;
        }
        setSubTasks(taskData.subtasks.sort((subTask) => (subTask.isCompleted ? 1 : -1)));
    }, [taskData]);

    if (taskData === null) {
        return null;
    }

    const { id, title, description, date, time } = taskData;

    const currentPercentage = calculateCurrentPercentage(taskData);

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
                        {subTasks.map((subtask) => (
                            <li key={subtask.id}>
                                <SubTaskCard
                                    {...subtask}
                                    onChange={changeSubTaskHandler}
                                    onDelete={deleteSubTaskHandler}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
                <div className={classes['create-container']}>
                    <ButtonLink
                        to={getCreateSubTaskLink(id)}
                        className={classes['create-button']}
                        view={Buttons.PRIMARY}
                        size={ButtonSizes.XL}
                        fullWidth
                    >
                        Добавить
                    </ButtonLink>
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
