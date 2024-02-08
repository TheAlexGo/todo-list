import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, query, where, limit, updateDoc, deleteDoc } from 'firebase/firestore';

import { addSubTask, addTask, addUser } from '@services/api/adding';
import { getSubTasksCollection, getTasksCollection, getUsersCollection } from '@services/api/collections';
import { subTaskDataConvert, taskDataConvert, userDataConvert } from '@services/api/converts';
import { getSubTaskDoc, getTaskDoc, getUserDoc } from '@services/api/docs';
import { getSubTaskRef, getTaskRef, getUserRef } from '@services/api/refs';
import { Logger } from '@services/logger';

import type { IUserData, ITask, ISubTask, TSubTaskApi, TTaskApi, TUserDataApi } from '@types';

import type { FirebaseApp } from 'firebase/app';

export const initializeAPI = (): FirebaseApp => {
    const firebaseApp = initializeApp({
        apiKey: 'AIzaSyCyNeuud_nw1aEMKx1pgp163-fwV_mJA-s',
        authDomain: 'todo-list-96f42.firebaseapp.com',
        projectId: 'todo-list-96f42',
        storageBucket: 'todo-list-96f42.appspot.com',
        messagingSenderId: '416917766819',
        appId: '1:416917766819:web:69487c2a7f2f14d20ab516',
    });

    getAuth(firebaseApp);
    getFirestore(firebaseApp);

    return firebaseApp;
};

/**
 * CRUD для пользовательских данных
 */
export const readUserDataByUserId = async (userId: string): Promise<IUserData | null> => {
    const q = query(getUsersCollection(), where('userId', '==', userId), limit(1));
    const querySnapshot = await getDocs(q);

    let userData: IUserData | null = null;

    try {
        if (querySnapshot.docs.length !== 0) {
            userData = await userDataConvert(querySnapshot.docs[0]);
        }
    } catch (e) {
        return Promise.reject(e);
    }

    return userData;
};

export const readUserData = async (userDataId: string): Promise<IUserData> => {
    const userDataDoc = await getUserDoc(userDataId);
    if (userDataDoc.exists()) {
        return userDataConvert(userDataDoc);
    }
    return Promise.reject(new Error(`Пользователь с id ${userDataId} не найден!`));
};

export const createUserData = async (userData: IUserData): Promise<IUserData> => {
    try {
        const newDoc = await addUser(userData);
        return await readUserData(newDoc.id);
    } catch (_e) {
        const e = _e as Error;
        Logger.error(e);
        return Promise.reject(e);
    }
};

export const updateUserData = async (userId: string, userData: TUserDataApi): Promise<boolean> => {
    try {
        await updateDoc(getUserRef(userId), userData);
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * CRUD для подзадач
 */
export const createSubTask = async (subTask: TSubTaskApi, userId: string): Promise<string> => {
    try {
        const newSubTaskDoc = await addSubTask(subTask, userId);
        return newSubTaskDoc.id;
    } catch (_e) {
        const e = _e as Error;
        Logger.error(e);
        return Promise.reject(e);
    }
};

export const readSubTasks = async (userId: string, taskId: string): Promise<ISubTask[]> => {
    const q = query(getSubTasksCollection(), where('userId', '==', userId), where('taskId', '==', taskId));
    const querySnapshot = await getDocs(q);

    const subTasks: ISubTask[] = [];

    try {
        for (let i = 0; i < querySnapshot.size; i++) {
            // eslint-disable-next-line no-await-in-loop
            subTasks.push(await subTaskDataConvert(querySnapshot.docs[i]));
        }
    } catch (error) {
        return Promise.reject(error);
    }

    return subTasks;
};

export const readSubTask = async (subTaskId: string): Promise<ISubTask> => {
    const subTaskDoc = await getSubTaskDoc(subTaskId);
    if (subTaskDoc.exists()) {
        return subTaskDataConvert(subTaskDoc);
    }
    return Promise.reject(new Error(`Задача с id ${subTaskId} не найдена!`));
};

export const updateSubTask = async (subTask: TSubTaskApi, subTaskId: string): Promise<boolean> => {
    try {
        await updateDoc(getSubTaskRef(subTaskId), subTask);
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteSubTask = async (subTaskId: string): Promise<boolean> => {
    try {
        await deleteDoc(getSubTaskRef(subTaskId));
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * CRUD для задач
 */
export const createTask = async (task: TTaskApi, userId: string): Promise<string> => {
    try {
        const newDoc = await addTask(task, userId);
        return newDoc.id;
    } catch (_e) {
        const e = _e as Error;
        Logger.error(e);
        return Promise.reject(e);
    }
};

export const readTasks = async (userId: string): Promise<ITask[]> => {
    const q = query(getTasksCollection(), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const tasks: ITask[] = [];

    try {
        for (let i = 0; i < querySnapshot.size; i++) {
            // eslint-disable-next-line no-await-in-loop
            tasks.push(await taskDataConvert(querySnapshot.docs[i]));
        }
    } catch (error) {
        return Promise.reject(error);
    }

    return tasks;
};

export const readTask = async (taskId: string): Promise<ITask> => {
    const taskDoc = await getTaskDoc(taskId);
    if (taskDoc.exists()) {
        return taskDataConvert(taskDoc);
    }
    return Promise.reject(new Error(`Задача с id ${taskId} не найдена!`));
};

export const updateTask = async (task: TTaskApi, taskId: string): Promise<string> => {
    try {
        await updateDoc(getTaskRef(taskId), task);
        return taskId;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteTask = async (taskId: string, subTasks: ISubTask[]): Promise<boolean> => {
    try {
        await Promise.all(subTasks.map((subTask) => deleteSubTask(subTask.id)));
        await deleteDoc(getTaskRef(taskId));
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};
