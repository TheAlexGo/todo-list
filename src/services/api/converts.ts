import { type QueryDocumentSnapshot } from 'firebase/firestore';

import { readSubTasks } from '@services/api';
import { Logger } from '@services/logger';

import {
    type ISubTask,
    type ITask,
    type IUserData,
    type TSubTaskApiRequest,
    type TTaskApiRequest,
    type TUserDataApiRequest,
} from '@types';

export const userDataConvert = async (userDoc: QueryDocumentSnapshot): Promise<IUserData> => {
    const userData = userDoc.data() as TUserDataApiRequest;
    delete userData.id;

    return {
        ...userData,
    };
};

export const taskDataConvert = async (taskDoc: QueryDocumentSnapshot): Promise<ITask> => {
    const taskData = taskDoc.data() as TTaskApiRequest;
    delete taskData.userId;
    const subTasksData = await readSubTasks(taskDoc.id);
    return {
        ...taskData,
        id: taskDoc.id,
        subtasks: subTasksData,
    };
};

export const subTaskDataConvert = async (subTaskDoc: QueryDocumentSnapshot): Promise<ISubTask> => {
    const subTaskData = subTaskDoc.data() as TSubTaskApiRequest;
    delete subTaskData.userId;
    delete subTaskData.taskId;
    Logger.debug(subTaskData);
    return {
        id: subTaskDoc.id,
        ...subTaskData,
    };
};
