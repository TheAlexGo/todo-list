import React, { useState, type FC, type FormEvent, type JSX } from 'react';

import { validateNotEmpty } from '@utils/validate';

import { CreateTaskForm } from '@components/forms/CreateTaskForm/CreateTaskForm';
import { useFieldReducer } from '@features/auth/base/useFieldReducer';
import { Logger } from '@services/logger';

import type { IInput } from '@components/inputs/Input/Input';
import type { ITextarea } from '@components/inputs/Textarea/Textarea';
import type { IDatePicker } from '@components/inputs/time/DatePicker/DatePicker';
import type { ITimePicker } from '@components/inputs/time/TimePicker/TimePicker';

export const CreateTaskContainer: FC = (): JSX.Element => {
    const [titleState, titleChangeHandler, titleErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Название задачи',
    });

    const [descriptionState, descriptionChangeHandler, descriptionErrorHandler] = useFieldReducer<
        ITextarea,
        HTMLTextAreaElement
    >({
        title: 'Описание задачи',
    });

    const [dateState, dateChangeHandler, dateErrorHandler] = useFieldReducer<IDatePicker, HTMLInputElement>({});

    const [timeState, timeChangeHandler, timeErrorHandler] = useFieldReducer<ITimePicker, HTMLInputElement>({});

    const [createError] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: title } = titleState;
        const { value: description } = descriptionState;
        const { value: date } = dateState;
        const { value: time } = timeState;

        let isValid = true;
        if (!validateNotEmpty(title)) {
            isValid = false;
            titleErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(description)) {
            isValid = false;
            descriptionErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(date)) {
            isValid = false;
            dateErrorHandler('Обязательное поле!');
        }
        if (!validateNotEmpty(time)) {
            isValid = false;
            timeErrorHandler('Обязательное поле!');
        }
        if (isValid) {
            Logger.info('Создали задачу!');
            Logger.info(title, description, date, time);
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
