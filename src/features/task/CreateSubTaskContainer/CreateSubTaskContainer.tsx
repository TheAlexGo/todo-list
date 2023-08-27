import React, { type FC, type JSX, type FormEvent, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { CreateSubTaskForm } from '@components/forms/CreateSubTaskForm/CreateSubTaskForm';
import { type IInput } from '@components/inputs/Input/Input';
import { type ITextarea } from '@components/inputs/Textarea/Textarea';
import { useFieldReducer } from '@features/auth/base/useFieldReducer';
import { Logger } from '@services/logger';
import { validateNotEmpty } from '@utils/validate';

import { Pages } from '@types';

interface ICreateSubTaskContainer {}

export const CreateSubTaskContainer: FC<ICreateSubTaskContainer> = (): JSX.Element => {
    const [titleState, titleChangeHandler, titleErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Название задачи',
    });

    const [descriptionState, descriptionChangeHandler, descriptionErrorHandler] = useFieldReducer<
        ITextarea,
        HTMLTextAreaElement
    >({
        title: 'Описание задачи',
    });

    const [createError] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: currentTitle } = titleState;
        const { value: currentDescription } = descriptionState;

        let isValid = true;
        if (!validateNotEmpty(currentTitle)) {
            isValid = false;
            titleErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(currentDescription)) {
            isValid = false;
            descriptionErrorHandler('Обязательное поле!');
        }
        if (isValid) {
            Logger.debug('Создали подзадачу!');
            Logger.debug(currentTitle, currentDescription);
            navigate(state?.from || Pages.INDEX);
        }
    };

    return (
        <CreateSubTaskForm
            title={{ ...titleState, onChange: titleChangeHandler }}
            description={{ ...descriptionState, onChange: descriptionChangeHandler }}
            error={createError}
            onSubmit={submitHandler}
        />
    );
};
