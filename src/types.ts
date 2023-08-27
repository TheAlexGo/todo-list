import type { FC, SVGProps } from 'react';

import type { ProviderId } from 'firebase/auth';

export enum RoutingConstants {
    ID = ':id',
}

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    SETTINGS = '/settings',
    TASK = 'task',
    READ_TASK = '/task/:id',
    CREATE_TASK = '/task/create',
    UPDATE_TASK = '/task/:id/update',
    COMPLETED_TASKS = '/tasks/completed',
    IN_PROGRESS_TASKS = '/tasks/in_progress',
    SUBTASK_CREATE = '/task/:id/create',
    NOT_FOUND = '/404',
}

export type TRequired<A, T extends keyof A> = Required<Pick<A, T>>;

export type ParamRequired<T extends keyof RouteParams> = TRequired<RouteParams, T>;

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
    userId: string;
    email: string;
    name: string;
}

export interface RouteParams {
    id: string;
}

export interface ISubTask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    subtasks: ISubTask[];
}
