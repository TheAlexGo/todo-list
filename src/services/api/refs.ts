import { doc, type DocumentReference } from 'firebase/firestore';

import { getSubTasksCollection, getTasksCollection, getUsersCollection } from '@services/api/collections';

export const getUserRef = (userId: string): DocumentReference => doc(getUsersCollection(), userId);

export const getTaskRef = (taskId: string): DocumentReference => doc(getTasksCollection(), taskId);

export const getSubTaskRef = (subTaskId: string): DocumentReference => doc(getSubTasksCollection(), subTaskId);
