import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import cn from 'classnames';

import { Icons } from '@components/Icon/Icon';
import { Menu } from '@components/Menu/Menu';

import { type ISubTask } from '@types';

import classes from './SubTaskCard.module.scss';

interface ISubTaskCard extends ISubTask {
    onChange: (subtask: ISubTask) => void;
}

type SubTaskCardProps = ISubTaskCard & Omit<HTMLAttributes<HTMLElement>, 'onChange'>;

export const SubTaskCard: FC<SubTaskCardProps> = ({
    id,
    title,
    isCompleted,
    className,
    onChange,
    ...props
}): JSX.Element => {
    const rootClasses = cn(classes.wrapper, className);

    const controlId = `subtask_${id}`;

    const changeHandler = () => {
        onChange({ id, title, isCompleted });
    };

    return (
        <article {...props} className={rootClasses}>
            <label htmlFor={controlId} className={classes.label}>
                <h4 className={classes.title}>{title}</h4>
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
                <Menu
                    id={`sub-task-card_more-${id}`}
                    items={[
                        {
                            id: 'more',
                            isSelected: false,
                            icon: Icons.MORE,
                            elements: [
                                {
                                    id: 'edit',
                                    title: 'Редактировать',
                                    isSelected: false,
                                },
                                {
                                    id: 'delete',
                                    title: 'Удалить',
                                    isSelected: false,
                                },
                            ],
                        },
                    ]}
                />
            </label>
        </article>
    );
};
