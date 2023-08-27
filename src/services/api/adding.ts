import { addDoc, type DocumentReference } from 'firebase/firestore';

import { getSubTasksCollection, getTasksCollection, getUsersCollection } from '@services/api/collections';

import { type IUserData, type TSubTaskApi, type TTaskApi } from '@types';

export const addUser = async (userData: IUserData): Promise<DocumentReference> =>
    addDoc(getUsersCollection(), {
        ...userData,
    });

export const addTask = async (task: TTaskApi, userId: string): Promise<DocumentReference> =>
    addDoc(getTasksCollection(), {
        ...task,
        userId,
    });

export const addSubTask = async (subtask: TSubTaskApi, taskId: string, userId: string): Promise<DocumentReference> =>
    addDoc(getSubTasksCollection(), {
        ...subtask,
        userId,
        taskId,
    });
