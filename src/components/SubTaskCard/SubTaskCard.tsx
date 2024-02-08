import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { ActionsMenu } from '@components/ActionsMenu/ActionsMenu';
import { Icons } from '@components/Icon/Icon';
import { deleteSubTask } from '@services/api';
import { getUpdateSubTaskLink } from '@utils/routing';

import type { ISubTask } from '@types';

import classes from './SubTaskCard.module.scss';

interface ISubTaskCard extends ISubTask {
    isDisabled?: boolean;
    onChange: (subtask: ISubTask) => void;
    onDelete: (subtask: ISubTask) => void;
}

type SubTaskCardProps = ISubTaskCard & Omit<HTMLAttributes<HTMLElement>, 'onChange'>;

export const SubTaskCard: FC<SubTaskCardProps> = ({
    id,
    taskId,
    title,
    isCompleted,
    isDisabled = false,
    className,
    onChange,
    onDelete,
    ...props
}): JSX.Element => {
    const taskData = { id, taskId, title, isCompleted };
    const navigate = useNavigate();
    const location = useLocation();

    const rootClasses = cn(
        classes.wrapper,
        {
            [classes['__is-disabled']]: isDisabled,
        },
        className,
    );

    const controlId = `subtask_${id}`;

    const changeHandler = () => {
        onChange(taskData);
    };

    const editClickHandler = () => {
        navigate(getUpdateSubTaskLink(taskId, id), {
            state: {
                from: location,
            },
        });
    };

    const deleteClickHandler = () => {
        deleteSubTask(id).then((result) => {
            if (result) {
                onDelete(taskData);
            }
        });
    };

    return (
        <article {...props} className={rootClasses}>
            <label htmlFor={controlId} className={classes.label}>
                <h4 className={classes.title}>{title}</h4>
            </label>
            <div className={classes.actions}>
                <div className={classes['checkbox-wrapper']}>
                    <input
                        id={controlId}
                        type="checkbox"
                        className={classes.checkbox}
                        onChange={changeHandler}
                        checked={isCompleted}
                    />
                    <div className={classes['checkbox-custom']} />
                </div>
                <ActionsMenu
                    id={`sub-task-card_more-${id}`}
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
        </article>
    );
};
