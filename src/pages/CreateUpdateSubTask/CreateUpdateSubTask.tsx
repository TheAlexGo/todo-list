import React, { type FC, type JSX } from 'react';

import { Await, Navigate, useLoaderData, useParams } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { CreateSubTaskContainer } from '@features/task/CreateSubTaskContainer/CreateSubTaskContainer';

import type { ISubTask, ParamRequired } from '@types';
import { Pages } from '@types';

export const CreateUpdateSubTask: FC = (): JSX.Element => {
    const { id, subTaskId } = useParams<ParamRequired<'id' | 'subTaskId'>>();
    const { subTaskResponse } = useLoaderData() as { subTaskResponse: ISubTask };

    const title = id ? 'Редактировать' : 'Создать';
    const page = id ? Pages.UPDATE_SUBTASK : Pages.SUBTASK_CREATE;

    const renderComponent = (subTask: ISubTask) => <CreateSubTaskContainer {...subTask} subTaskId={subTaskId} />;

    return (
        <>
            <Header page={page} text={`${title} подзадачу`} />
            <main>
                <Await resolve={subTaskResponse} errorElement={<Navigate to={Pages.NOT_FOUND} />}>
                    {renderComponent}
                </Await>
            </main>
        </>
    );
};
