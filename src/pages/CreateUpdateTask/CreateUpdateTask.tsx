import React, { type FC, type JSX } from 'react';

import { Await, useLoaderData, useParams } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { CreateTaskContainer } from '@features/task/CreateTaskContainer/CreateTaskContainer';

import { type ITask, Pages, type ParamRequired } from '@types';

export const CreateUpdateTask: FC = (): JSX.Element => {
    const { id } = useParams<ParamRequired<'id'>>();
    const { taskResponse } = useLoaderData() as { taskResponse: ITask };

    const title = id ? 'Редактировать' : 'Создать';
    const page = id ? Pages.UPDATE_TASK : Pages.CREATE_TASK;

    const renderComponent = (task: ITask) => <CreateTaskContainer {...task} taskId={id} />;

    return (
        <>
            <Header page={page} text={`${title} задачу`} />
            <main>
                <Await resolve={taskResponse}>{renderComponent}</Await>
            </main>
        </>
    );
};
