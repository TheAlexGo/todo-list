import type { FC, SVGProps } from 'react';

import type { ProviderId } from 'firebase/auth';

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    SETTINGS = '/settings',
    TASK = 'task',
    CREATE_TASK = '/task/create',
    COMPLETED_TASKS = '/tasks/completed',
    IN_PROGRESS_TASKS = '/tasks/in_progress',
}

export type TAuthResult = Promise<IUserData | null>;

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

export type PropsWithClassname<T = unknown> = T & { className?: string };

export type ProviderIdUnion = (typeof ProviderId)[keyof typeof ProviderId];

export interface IAuthContext {
    isAuthenticate: boolean | null;
    user: IUserData | null;
    signUpWithCredentials: (name: string, email: string, password: string) => TAuthResult;
    logInWithEmailAndPassword: (email: string, password: string) => TAuthResult;
    logInWithPopup: (providerId: ProviderIdUnion) => TAuthResult;
    logOut: () => void;
}

export interface IUserData {
    email: string;
    name: string;
}

export interface RouteParams {
    id: string;
}
