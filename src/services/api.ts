import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, getDocs, collection, getFirestore, query, where, limit } from 'firebase/firestore';

import { Logger } from '@services/logger';

import type { IUserData, ITask } from '@types';

import type { FirebaseApp } from 'firebase/app';

enum DocsId {
    USERS = 'users',
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

        querySnapshot.forEach((doc) => {
            const data = doc.data() as IUserData;

            userData = {
                ...data,
            };
        });
    } catch (e) {
        return Promise.reject(e);
    }

    return userData;
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

export const getTask = async (taskId: string): Promise<ITask> =>
    new Promise((resolve) => {
        setTimeout(
            () =>
                resolve({
                    id: taskId,
                    title: 'Hi-Fi Wireframe',
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n",
                    date: '2023-08-03',
                    time: '02:42',
                    subtasks: [
                        {
                            id: '1',
                            title: 'User Interviews',
                            isCompleted: true,
                        },
                        {
                            id: '2',
                            title: 'Wireframes',
                            isCompleted: true,
                        },
                        {
                            id: '3',
                            title: 'Design System',
                            isCompleted: true,
                        },
                        {
                            id: '4',
                            title: 'Icons',
                            isCompleted: true,
                        },
                        {
                            id: '5',
                            title: 'Final Mockups',
                            isCompleted: true,
                        },
                    ],
                }),
            1000,
        );
    });
