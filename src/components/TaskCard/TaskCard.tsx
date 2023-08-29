import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ActionsMenu } from '@components/ActionsMenu/ActionsMenu';
import { Icons } from '@components/Icon/Icon';
import { ProgressBarCircle } from '@components/ProgressBar/ProgressBarCircle/ProgressBarCircle';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { deleteTask } from '@services/api';
import { getTaskLink } from '@utils/routing';
import { calculateCurrentPercentage, getCurrentDateText } from '@utils/task';

import { type ITask, Pages } from '@types';

import classes from './TaskCard.module.scss';

interface ITaskCard extends ITask {
    onDelete: (task: ITask) => void;
}

type TTaskProps = ITaskCard & HTMLAttributes<HTMLElement>;

export const TaskCard: FC<TTaskProps> = ({
    id,
    title,
    description,
    date,
    time,
    subtasks,
    className,
    onDelete,
    ...props
}): JSX.Element => {
    const task: ITask = {
        id,
        title,
        description,
        date,
        time,
        subtasks,
    };

    const navigate = useNavigate();

    const currentPercentage = calculateCurrentPercentage(subtasks);

    const taskLink = getTaskLink(id);

    const menuId = `task-card-menu-${uuidv4()}`;

    const rootClasses = cn(classes.card, className);

    const editClickHandler = () =>
        navigate(Pages.CREATE_TASK, {
            state: {
                to: Pages.READ_TASK,
            },
        });

    const deleteClickHandler = () => {
        deleteTask(id, subtasks).then((result) => {
            if (result) {
                onDelete(task);
            }
        });
    };

    return (
        <RoutingLink to={taskLink}>
            <article {...props} className={rootClasses}>
                <h3 className={classes.heading}>{title}</h3>
                <div className={classes.menu}>
                    <ActionsMenu
                        id={menuId}
                        items={[
                            {
                                id: `more-${id}`,
                                isSelected: false,
                                icon: Icons.MORE,
                                label: 'Действия',
                                elements: [
                                    {
                                        id: `edit-${id}`,
                                        title: 'Редактировать',
                                        isSelected: false,
                                        onClick: editClickHandler,
                                    },
                                    {
                                        id: `delete-${id}`,
                                        title: 'Удалить',
                                        isSelected: false,
                                        onClick: deleteClickHandler,
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
                <div className={classes.date}>
                    Сделать до: <br /> <time>{getCurrentDateText(date)}</time>
                </div>
                <div className={classes.progress}>
                    <ProgressBarCircle id={`progress-${id}`} percentage={currentPercentage} />
                </div>
            </article>
        </RoutingLink>
    );
};
