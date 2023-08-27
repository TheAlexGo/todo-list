import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type FC,
    type JSX,
    type PropsWithChildren,
} from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getAuth,
    browserLocalPersistence,
    ProviderId,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth';

import { readUserData, createUserData, readUserDataByUserId } from '@services/api';
import { Logger } from '@services/logger';

import type { IAuthContext, IUserData, ProviderIdUnion, TAuthResult } from '@types';

import type { FirebaseApp } from 'firebase/app';
import type { UserCredential, AuthProvider as IOAuthProvider } from 'firebase/auth';

interface IAuthProvider {
    firebaseApp: FirebaseApp;
}

const AuthContext = createContext<IAuthContext>({
    isAuthenticate: null,
    user: null,
    signUpWithCredentials: () => Promise.resolve(null),
    logInWithEmailAndPassword: () => Promise.resolve(null),
    logInWithPopup: () => Promise.resolve(null),
    logOut: () => undefined,
});

export const useAuth = () => useContext(AuthContext);

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

    const processSignIn = useCallback((promise: Promise<UserCredential>): TAuthResult => {
        beforeAuth();

        return promise
            .then((result) => {
                Logger.info('AuthProvider, processAuth complete:', result);
                return result;
            })
            .then(({ user: responseUser }) => readUserData(responseUser.uid))
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
    }, []);

    const processSignUp = useCallback((promise: Promise<UserCredential>): Promise<UserCredential> => {
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
    }, []);

    const signUpWithCredentials = useCallback(
        (name: string, email: string, password: string) =>
            processSignUp(createUserWithEmailAndPassword(auth, email, password)).then(({ user: responseUser }) =>
                createUserData({
                    userId: responseUser.uid,
                    name,
                    email,
                }),
            ),
        [auth, processSignUp],
    );

    const logInWithEmailAndPassword: IAuthContext['logInWithEmailAndPassword'] = useCallback(
        (email: string, password: string): TAuthResult =>
            processSignIn(signInWithEmailAndPassword(auth, email, password)),
        [auth, processSignIn],
    );

    const logInWithPopup: IAuthContext['logInWithPopup'] = useCallback(
        (providerId: ProviderIdUnion): TAuthResult => {
            const currentProvider = ALLOWED_OAUTH_PROVIDERS[providerId];

            if (currentProvider) {
                return processSignIn(signInWithPopup(auth, currentProvider));
            }

            const error = new Error(`Провайдер ${providerId} не реализован!`);
            Logger.error(error);
            return Promise.reject(error);
        },
        [auth, processSignIn],
    );

    const logOut: IAuthContext['logOut'] = useCallback(() => signOut(auth), [auth]);

    const providerValue = useMemo(
        () => ({
            isAuthenticate,
            user,
            signUpWithCredentials,
            logInWithEmailAndPassword,
            logInWithPopup,
            logOut,
        }),
        [isAuthenticate, logInWithEmailAndPassword, logInWithPopup, logOut, signUpWithCredentials, user],
    );

    useEffect(() => {
        /**
         * Устанавливаем данные пользователя в постоянную куку
         */
        auth.setPersistence(browserLocalPersistence);

        /**
         * Подписываемся на событие изменения состояния аворизации пользователя
         */
        auth.onAuthStateChanged((responseUser) => {
            if (responseUser) {
                readUserDataByUserId(responseUser.uid)
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

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
