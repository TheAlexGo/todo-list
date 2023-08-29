import React, { type FC, type JSX, type FormEvent, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CreateSubTaskForm } from '@components/forms/CreateSubTaskForm/CreateSubTaskForm';
import { type IInput } from '@components/inputs/Input/Input';
import { useFieldReducer } from '@features/auth/base/useFieldReducer';
import { useAuth } from '@providers/AuthProvider';
import { createSubTask, updateSubTask } from '@services/api';
import { Logger } from '@services/logger';
import { getTaskLink } from '@utils/routing';
import { validateNotEmpty } from '@utils/validate';

import { type ParamRequired } from '@types';

interface ICreateSubTaskContainer {
    subTaskId?: string;
    title?: string;
}

export const CreateSubTaskContainer: FC<ICreateSubTaskContainer> = ({ subTaskId, title }): JSX.Element => {
    const [titleState, titleChangeHandler, titleErrorHandler] = useFieldReducer<IInput, HTMLTextAreaElement>({
        title: 'Описание подзадачи',
        value: title,
    });

    const [createError] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id: taskId } = useParams<ParamRequired<'id'>>() as ParamRequired<'id'>;
    const { userId } = useAuth().user!;

    const isUpdate = subTaskId !== undefined;

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: currentTitle } = titleState;

        let isValid = true;
        if (!validateNotEmpty(currentTitle)) {
            isValid = false;
            titleErrorHandler('Обязательное поле!');
        }
        if (isValid) {
            Logger.debug('Создали подзадачу!', currentTitle);
            const subTask = {
                taskId,
                title: currentTitle,
                isCompleted: false,
            };
            new Promise((resolve) => {
                if (isUpdate) {
                    resolve(updateSubTask(subTask, subTaskId));
                } else {
                    resolve(createSubTask(subTask, userId));
                }
            }).then(() => {
                navigate(state?.from || getTaskLink(taskId));
            });
        }
    };

    return (
        <CreateSubTaskForm
            title={{ ...titleState, onChange: titleChangeHandler }}
            error={createError}
            onSubmit={submitHandler}
            buttonText={isUpdate ? 'Сохранить' : 'Создать'}
        />
    );
};
