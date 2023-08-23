import React, { FC, JSX } from 'react';

import { Header } from '@components/Header/Header';
import { CreateTaskContainer } from '@features/task/CreateTaskContainer/CreateTaskContainer';

interface ICreateTask {}

export const CreateTask: FC<ICreateTask> = (): JSX.Element => {
    return (
        <div>
            <Header title="Создать задачу" />
            <CreateTaskContainer />
        </div>
    );
};
