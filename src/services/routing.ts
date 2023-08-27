import { type Location } from '@remix-run/router';
import { type NavigateFunction } from 'react-router/dist/lib/hooks';
import { defer, type Params } from 'react-router-dom';

import { getTask } from '@services/api';
import { getPreviousPage } from '@utils/routing';

import { type ITask, type Pages } from '@types';

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
    const taskResponsePromise: Promise<ITask> = getTask(params.id!);
    return defer({
        taskResponse: taskResponsePromise,
    });
};
