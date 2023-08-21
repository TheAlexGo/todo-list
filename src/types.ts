import { ProviderIdUnion } from '@providers/AuthProvider';
import { FC, SVGProps } from 'react';
import { User, UserCredential } from 'firebase/auth';

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
}

export type TAuthResult = Promise<UserCredential>;

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

export interface IAuthContext {
    isAuthenticate: boolean | null;
    user: User | null;
    signUpWithCredentials: (name: string, email: string, password: string) => TAuthResult;
    logInWithEmailAndPassword: (email: string, password: string) => TAuthResult;
    logInWithPopup: (providerId: ProviderIdUnion) => TAuthResult;
    logOut: () => void;
}
