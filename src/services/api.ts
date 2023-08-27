import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    addDoc,
    getDocs,
    collection,
    getFirestore,
    query,
    where,
    limit,
    doc,
    getDoc,
    updateDoc,
    type DocumentReference,
} from 'firebase/firestore';

import { Logger } from '@services/logger';

import type { IUserData, ITask, ISubTask } from '@types';

import type { FirebaseApp } from 'firebase/app';

enum DocsId {
    USERS = 'users',
    TASKS = 'tasks',
    SUBTASKS = 'subtasks',
}

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

export const readUserDataByRef = async (userId: string): Promise<IUserData | null> => {
    const db = getFirestore();
    let userData: IUserData | null = null;

    try {
        const q = query(collection(db, DocsId.USERS), where('userId', '==', userId), limit(1));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((userDoc) => {
            const data = userDoc.data() as IUserData;

            userData = {
                ...data,
            };
        });
    } catch (e) {
        return Promise.reject(e);
    }

    return userData;
};

const getTaskRef = (id: string): DocumentReference => {
    const db = getFirestore();
    return doc(db, DocsId.TASKS, id);
};

export const readUserData = async (userId: string): Promise<IUserData | null> => readUserDataByRef(userId);

export const writeUserData = async (userId: string, name: string, email: string): Promise<IUserData | null> => {
    const db = getFirestore();
    try {
        await addDoc(collection(db, DocsId.USERS), {
            userId,
            name,
            email,
        });
        return await readUserDataByRef(userId);
    } catch (_e) {
        const e = _e as Error;
        Logger.error(e);
        return Promise.reject(e);
    }
};

export const createTask = async (task: Omit<ITask, 'id' | 'subtasks'>, userId: string): Promise<string> => {
    const db = getFirestore();
    try {
        const newDoc = await addDoc(collection(db, DocsId.TASKS), {
            ...task,
            userId,
        });
        return newDoc.id;
    } catch (_e) {
        const e = _e as Error;
        Logger.error(e);
        return Promise.reject(e);
    }
};

export const getTasks = async (userId: string): Promise<ITask[]> => {
    const db = getFirestore();
    const q = query(collection(db, DocsId.TASKS), where('userId', '==', userId), limit(10));
    const querySnapshot = await getDocs(q);

    const tasks: ITask[] = [];

    try {
        querySnapshot.forEach((taskDoc) => {
            const taskData = taskDoc.data() as Omit<ITask, 'id'> & { userId?: string };
            delete taskData.userId;
            tasks.push({
                id: taskDoc.id,
                ...taskData,
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }

    return tasks;
};

export const getSubTasks = async (taskId: string): Promise<ISubTask[]> => {
    const db = getFirestore();
    const q = query(collection(db, DocsId.SUBTASKS), where('taskId', '==', taskId), limit(10));

    const tasks: ISubTask[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((taskDoc) => {
            const taskData = taskDoc.data() as Omit<ISubTask, 'id'> & { userId?: string; taskId?: string };
            delete taskData.userId;
            delete taskData.taskId;
            Logger.debug(taskData);
            tasks.push({
                id: taskDoc.id,
                ...taskData,
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }

    return tasks;
};

export const getTask = async (taskId: string): Promise<ITask> => {
    const db = getFirestore();
    const taskDoc = await getDoc(doc(collection(db, DocsId.TASKS), taskId));
    if (taskDoc.exists()) {
        const taskData = taskDoc.data() as Omit<ITask, 'id' | 'subtasks'> & { userId?: string };
        delete taskData.userId;
        const subTasksData = await getSubTasks(taskId);
        return {
            ...taskData,
            id: taskDoc.id,
            subtasks: subTasksData,
        };
    }
    return Promise.reject(new Error(`Задача с id ${taskId} не найдена!`));
};

export const createSubTask = async (task: Omit<ISubTask, 'id'>, taskId: string, userId: string): Promise<string> => {
    const db = getFirestore();
    try {
        const newDoc = await addDoc(collection(db, DocsId.SUBTASKS), {
            ...task,
            taskId,
            userId,
        });
        return newDoc.id;
    } catch (_e) {
        const e = _e as Error;
        Logger.error(e);
        return Promise.reject(e);
    }
};

export const updateTask = async (id: string, task: Omit<ITask, 'id' | 'subtasks'>): Promise<boolean> => {
    try {
        await updateDoc(getTaskRef(id), task);
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};
