import { Pages, RoutingConstants } from '@types';

export const getUpdateTaskLink = (taskId: string): string => Pages.UPDATE_TASK.replace(RoutingConstants.ID, taskId);

export const getTaskLink = (taskId: string): string => Pages.READ_TASK.replace(RoutingConstants.ID, taskId);

export const getCreateSubTaskLink = (taskId: string): string =>
    Pages.SUBTASK_CREATE.replace(RoutingConstants.ID, taskId);

export const getPreviousPage = (page: Pages) => {
    switch (page) {
        case Pages.READ_TASK:
            return Pages.INDEX;
        default:
            return Pages.INDEX;
    }
};
