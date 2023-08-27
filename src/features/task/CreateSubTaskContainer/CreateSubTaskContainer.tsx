import React, { type FC, type JSX, type FormEvent, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CreateSubTaskForm } from '@components/forms/CreateSubTaskForm/CreateSubTaskForm';
import { type IInput } from '@components/inputs/Input/Input';
import { useFieldReducer } from '@features/auth/base/useFieldReducer';
import { useAuth } from '@providers/AuthProvider';
import { createSubTask } from '@services/api';
import { Logger } from '@services/logger';
import { validateNotEmpty } from '@utils/validate';

import { Pages, type ParamRequired } from '@types';

interface ICreateSubTaskContainer {}

export const CreateSubTaskContainer: FC<ICreateSubTaskContainer> = (): JSX.Element => {
    const [titleState, titleChangeHandler, titleErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Название подзадачи',
    });

    const [createError] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id: taskId } = useParams<ParamRequired<'id'>>() as ParamRequired<'id'>;
    const { userId } = useAuth().user!;

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: currentTitle } = titleState;

        let isValid = true;
        if (!validateNotEmpty(currentTitle)) {
            isValid = false;
            titleErrorHandler('Обязательное поле!');
        }
        if (isValid) {
            Logger.debug('Создали подзадачу!');
            Logger.debug(currentTitle);
            createSubTask(
                {
                    title: currentTitle,
                    isCompleted: false,
                },
                taskId,
                userId,
            ).then(() => {
                navigate(state?.from || Pages.INDEX);
            });
        }
    };

    return (
        <CreateSubTaskForm
            title={{ ...titleState, onChange: titleChangeHandler }}
            error={createError}
            onSubmit={submitHandler}
        />
    );
};
