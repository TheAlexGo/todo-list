import { collection, type CollectionReference, getFirestore } from 'firebase/firestore';

enum DocsId {
    USERS = 'users',
    TASKS = 'tasks',
    SUBTASKS = 'subtasks',
}

export const getUsersCollection = (): CollectionReference => {
    const db = getFirestore();
    return collection(db, DocsId.USERS);
};

export const getTasksCollection = (): CollectionReference => {
    const db = getFirestore();
    return collection(db, DocsId.TASKS);
};

export const getSubTasksCollection = (): CollectionReference => {
    const db = getFirestore();
    return collection(db, DocsId.SUBTASKS);
};
