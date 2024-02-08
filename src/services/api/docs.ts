import { type DocumentSnapshot, getDoc } from 'firebase/firestore';

import { getSubTaskRef, getTaskRef, getUserRef } from '@services/api/refs';

export const getUserDoc = async (userId: string): Promise<DocumentSnapshot> => getDoc(getUserRef(userId));

export const getTaskDoc = async (taskId: string): Promise<DocumentSnapshot> => getDoc(getTaskRef(taskId));

export const getSubTaskDoc = async (subTaskId: string): Promise<DocumentSnapshot> => getDoc(getSubTaskRef(subTaskId));
