import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, getDocs, collection, getFirestore, query, where, limit } from 'firebase/firestore';

import { Logger } from '@services/logger';
import { IUserData } from '@types';

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
