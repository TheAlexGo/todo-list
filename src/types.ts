import { FC, SVGProps } from 'react';

import { ProviderIdUnion } from '@providers/AuthProvider';

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
}

export type TAuthResult = Promise<IUserData | null>;

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

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
