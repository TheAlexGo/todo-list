import { type Location } from '@remix-run/router';
import { type NavigateFunction } from 'react-router/dist/lib/hooks';
import { defer, type Params } from 'react-router-dom';

import { readSubTask, readTask } from '@services/api';
import { getPreviousPage } from '@utils/routing';

import type { ISubTask, ITask, Pages } from '@types';

export interface LoadTaskResult {
    taskResponse: Promise<ITask>;
}

export const back = (state: Location['state'], navigate: NavigateFunction, page: Pages) => {
    const from = state?.from;
    if (from) {
        navigate(from, {
            state: from,
        });
    } else {
        navigate(getPreviousPage(page));
    }
};

export const loadTask = async ({ params }: { params: Params<'id'> }) => {
    const { id } = params;
    if (!id) {
        return defer({
            taskResponse: null,
        });
    }
    const taskResponsePromise: Promise<ITask> = readTask(id);
    return defer({
        taskResponse: taskResponsePromise,
    });
};

export const loadSubTask = async ({ params }: { params: Params<'subTaskId'> }) => {
    const { subTaskId } = params;
    if (!subTaskId) {
        return defer({
            subTaskResponse: null,
        });
    }
    const subTaskResponsePromise: Promise<ISubTask> = readSubTask(subTaskId);
    return defer({
        subTaskResponse: subTaskResponsePromise,
    });
};
