import React, { FC, JSX } from 'react';

import { Header } from '@components/Header/Header';
import { CreateTaskContainer } from '@features/task/CreateTaskContainer/CreateTaskContainer';

interface ICreateTask {}

export const CreateTask: FC<ICreateTask> = (): JSX.Element => (
    <>
        <Header text="Создать задачу" />
        <main>
            <CreateTaskContainer />
        </main>
    </>
);
