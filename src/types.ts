import type { FC, SVGProps } from 'react';

import type { ProviderId, UserCredential } from 'firebase/auth';

export enum RoutingConstants {
    ID = ':id',
}

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    SETTINGS = '/settings',
    TASKS = 'tasks',
    READ_TASK = '/tasks/:id',
    CREATE_TASK = '/tasks/create',
    UPDATE_TASK = '/tasks/:id/update',
    COMPLETED_TASKS = '/tasks/completed',
    IN_PROGRESS_TASKS = '/tasks/in_progress',
    SUBTASK_CREATE = '/tasks/:id/subtasks/create',
    UPDATE_SUBTASK = '/tasks/:id/subtasks/:subTaskId/update',
    NOT_FOUND = '/404',
}

export type TRequired<A, T extends keyof A> = Required<Pick<A, T>>;

export type ParamRequired<T extends keyof RouteParams> = TRequired<RouteParams, T>;

export type TAuthResult = Promise<UserCredential | null>;

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

export type TUserDataApi = Omit<IUserData, 'id'>;

export type TUserDataApiRequest = TUserDataApi & { id?: string };

export interface RouteParams {
    id: string;
    subTaskId: string;
}

export interface ISubTask {
    id: string;
    taskId: string;
    title: string;
    isCompleted: boolean;
}

export type TSubTaskApi = Omit<ISubTask, 'id'>;

export type TSubTaskApiRequest = TSubTaskApi & { userId?: string };

export interface ITask {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    subtasks: ISubTask[];
}

export type TTaskApi = Omit<ITask, 'id' | 'subtasks'>;

export type TTaskApiRequest = TTaskApi & { userId?: string };
