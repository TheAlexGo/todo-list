import React, { useState, type FC, type FormEvent, type JSX } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { CreateTaskForm } from '@components/forms/CreateTaskForm/CreateTaskForm';
import { useFieldReducer } from '@features/auth/base/useFieldReducer';
import { useAuth } from '@providers/AuthProvider';
import { createTask, updateTask } from '@services/api';
import { Logger } from '@services/logger';
import { validateNotEmpty } from '@utils/validate';

import { Pages } from '@types';

import type { IInput } from '@components/inputs/Input/Input';
import type { ITextarea } from '@components/inputs/Textarea/Textarea';
import type { IDatePicker } from '@components/inputs/time/DatePicker/DatePicker';
import type { ITimePicker } from '@components/inputs/time/TimePicker/TimePicker';

interface ICreateTaskContainer {
    taskId?: string;
    title?: string;
    description?: string;
    date?: string;
    time?: string;
}

export const CreateTaskContainer: FC<ICreateTaskContainer> = ({
    taskId,
    title,
    description,
    date,
    time,
}): JSX.Element => {
    const [titleState, titleChangeHandler, titleErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Название задачи',
        value: title,
    });

    const [descriptionState, descriptionChangeHandler, descriptionErrorHandler] = useFieldReducer<
        ITextarea,
        HTMLTextAreaElement
    >({
        title: 'Описание задачи',
        value: description,
    });

    const [dateState, dateChangeHandler, dateErrorHandler] = useFieldReducer<IDatePicker, HTMLInputElement>({
        value: date,
    });

    const [timeState, timeChangeHandler, timeErrorHandler] = useFieldReducer<ITimePicker, HTMLInputElement>({
        value: time,
    });

    const [createError] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const user = useAuth().user!;

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: currentTitle } = titleState;
        const { value: currentDescription } = descriptionState;
        const { value: currentDate } = dateState;
        const { value: currentTime } = timeState;

        let isValid = true;
        if (!validateNotEmpty(currentTitle)) {
            isValid = false;
            titleErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(currentDescription)) {
            isValid = false;
            descriptionErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(currentDate)) {
            isValid = false;
            dateErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(currentTime)) {
            isValid = false;
            timeErrorHandler('Обязательное поле!');
        }
        if (isValid) {
            Logger.debug('Создали задачу!', currentTitle, currentDescription, currentDate, currentTime);
            const task = {
                title: currentTitle,
                description: currentDescription,
                date: currentDate,
                time: currentTime,
            };
            new Promise((resolve) => {
                if (taskId) {
                    resolve(updateTask(taskId, task));
                } else {
                    resolve(createTask(task, user.userId));
                }
            }).then(() => {
                navigate(state?.from || Pages.INDEX);
            });
        }
    };

    return (
        <CreateTaskForm
            title={{ ...titleState, onChange: titleChangeHandler }}
            description={{ ...descriptionState, onChange: descriptionChangeHandler }}
            date={{ ...dateState, onChange: dateChangeHandler }}
            time={{ ...timeState, onChange: timeChangeHandler }}
            error={createError}
            onSubmit={submitHandler}
        />
    );
};
