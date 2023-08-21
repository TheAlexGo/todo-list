import { ProviderIdUnion } from '@providers/AuthProvider';
import { FC, SVGProps } from 'react';
import { User, UserCredential } from 'firebase/auth';

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
}

export type TLoginResult = Promise<UserCredential>;

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

export interface IAuthContext {
    isAuthenticate: boolean | null;
    user: User | null;
    logInWithEmailAndPassword: (email: string, password: string) => TLoginResult;
    logInWithPopup: (providerId: ProviderIdUnion) => TLoginResult;
    logOut: () => void;
}
