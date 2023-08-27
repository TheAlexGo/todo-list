import React, { type FC, type JSX } from 'react';

import { Header } from '@components/Header/Header';
import { CreateSubTaskContainer } from '@features/task/CreateSubTaskContainer/CreateSubTaskContainer';

import { Pages } from '@types';

export const CreateSubTask: FC = (): JSX.Element => (
    <>
        <Header page={Pages.CREATE_TASK} text="Создать подзадачу" />
        <main>
            <CreateSubTaskContainer />
        </main>
    </>
);
