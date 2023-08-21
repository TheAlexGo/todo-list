import React, { createContext, FC, JSX, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { FirebaseApp } from 'firebase/app';
import {
    UserCredential,
    createUserWithEmailAndPassword,
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

import { readUserData, writeUserData } from '@services/api';
import { Logger } from '@services/logger';
import { IAuthContext, IUserData, TAuthResult } from '@types';

interface IAuthProvider {
    firebaseApp: FirebaseApp;
}

const AuthContext = createContext<IAuthContext>({
    isAuthenticate: null,
    user: null,
    signUpWithCredentials: () => Promise.reject({}),
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
    const [user, setUser] = useState<IUserData | null>(null);

    const beforeAuth = () => {
        setIsAuthenticate(null);
        setUser(null);
    };

    const processSignIn = (promise: Promise<UserCredential>): TAuthResult => {
        beforeAuth();

        return promise
            .then((result) => {
                Logger.info('AuthProvider, processAuth complete:', result);
                return result;
            })
            .then(({ user }) => {
                return readUserData(user.uid);
            })
            .then((result) => {
                Logger.info(result);
                return result;
            })
            .catch((error) => {
                Logger.error(error);
                setUser(null);
                setIsAuthenticate(false);
                throw error;
            });
    };

    const processSignUp = (promise: Promise<UserCredential>): Promise<UserCredential> => {
        beforeAuth();

        return promise
            .then((result) => {
                Logger.info('AuthProvider, processAuth complete:', result);
                return result;
            })
            .catch((error) => {
                Logger.error(error);
                setUser(null);
                setIsAuthenticate(false);
                throw error;
            });
    };

    const signUpWithCredentials = (name: string, email: string, password: string) => {
        return processSignUp(createUserWithEmailAndPassword(auth, email, password)).then(({ user }) => {
            return writeUserData(user.uid, name, email);
        });
    };

    const logInWithEmailAndPassword: IAuthContext['logInWithEmailAndPassword'] = (
        email: string,
        password: string,
    ): TAuthResult => {
        return processSignIn(signInWithEmailAndPassword(auth, email, password));
    };

    const logInWithPopup: IAuthContext['logInWithPopup'] = (providerId: ProviderIdUnion): TAuthResult => {
        const currentProvider = ALLOWED_OAUTH_PROVIDERS[providerId];

        if (currentProvider) {
            return processSignIn(signInWithPopup(auth, currentProvider));
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
            if (user) {
                readUserData(user.uid)
                    .then((userData) => {
                        setUser(userData);
                        setIsAuthenticate(true);
                    })
                    .catch((e) => {
                        Logger.error(e);
                        setUser(null);
                        setIsAuthenticate(false);
                    });
            } else {
                setUser(null);
                setIsAuthenticate(false);
            }
        });
    }, [auth]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticate,
                user,
                signUpWithCredentials,
                logInWithEmailAndPassword,
                logInWithPopup,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
