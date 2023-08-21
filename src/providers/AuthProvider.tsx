import React, { createContext, FC, JSX, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { FirebaseApp } from 'firebase/app';
import {
    User,
    UserCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getAuth,
    browserLocalPersistence,
    ProviderId,
    GoogleAuthProvider,
    GithubAuthProvider,
    AuthProvider as IOAuthProvider,
} from 'firebase/auth';

import { Logger } from '@services/logger';
import { IAuthContext, TLoginResult } from '@types';

interface IAuthProvider {
    firebaseApp: FirebaseApp;
}

const AuthContext = createContext<IAuthContext>({
    isAuthenticate: null,
    user: null,
    logInWithEmailAndPassword: () => Promise.reject({}),
    logInWithPopup: () => Promise.reject({}),
    logOut: () => void 0,
});

export const useAuth = () => useContext(AuthContext);

export type ProviderIdUnion = (typeof ProviderId)[keyof typeof ProviderId];

export const ALLOWED_OAUTH_PROVIDERS: Partial<Record<ProviderIdUnion, IOAuthProvider>> = {
    [ProviderId.GOOGLE]: new GoogleAuthProvider(),
    [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const AuthProvider: FC<PropsWithChildren<IAuthProvider>> = ({ firebaseApp, children }): JSX.Element => {
    const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);

    const [isAuthenticate, setIsAuthenticate] = useState<IAuthContext['isAuthenticate']>(null);
    const [user, setUser] = useState<User | null>(null);

    const beforeLogin = () => {
        setIsAuthenticate(null);
        setUser(null);
    };

    const processLogin = (promise: Promise<UserCredential>): TLoginResult => {
        beforeLogin();

        return promise
            .then((result) => {
                Logger.info('AuthProvider, processLogin complete:', result);
                return result;
            })
            .catch((error) => {
                Logger.error(error);
                setUser(null);
                setIsAuthenticate(false);
                throw error;
            });
    };

    const logInWithEmailAndPassword: IAuthContext['logInWithEmailAndPassword'] = (
        email: string,
        password: string,
    ): TLoginResult => {
        return processLogin(signInWithEmailAndPassword(auth, email, password));
    };

    const logInWithPopup: IAuthContext['logInWithPopup'] = (providerId: ProviderIdUnion): TLoginResult => {
        const currentProvider = ALLOWED_OAUTH_PROVIDERS[providerId];

        if (currentProvider) {
            return processLogin(signInWithPopup(auth, currentProvider));
        }

        Logger.error(new Error(`Провайдер ${providerId} не реализован!`));
        return Promise.reject({});
    };

    const logOut: IAuthContext['logOut'] = () => signOut(auth);

    useEffect(() => {
        /**
         * Устанавливаем данные пользователя в постоянную куку
         */
        auth.setPersistence(browserLocalPersistence);

        /**
         * Подписываемся на событие изменения состояния аворизации пользователя
         */
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setIsAuthenticate(Boolean(user));
        });
    }, [auth]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticate,
                user,
                logInWithEmailAndPassword,
                logInWithPopup,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
