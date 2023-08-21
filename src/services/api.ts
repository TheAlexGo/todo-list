import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

    return firebaseApp;
};
