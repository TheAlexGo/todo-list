import React, { ChangeEvent, FC, FormEvent, JSX, Reducer, useReducer, MouseEvent, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProviderId } from 'firebase/auth';

import { ALLOWED_OAUTH_PROVIDERS, ProviderIdUnion, useAuth } from '@providers/AuthProvider';
import { Button, Buttons } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { IInput } from '@components/Input/Input';
import { LoginForm } from '@components/LoginForm/LoginForm';
import { Pages, TLoginResult } from '@types';
import { validateEmail, validatePassword } from '../../../../utils/validate';

import classes from './LoginContainer.module.scss';

interface ILoginContainer {}

type TReducer = Reducer<IInput, IAction>;

enum Actions {
    CHANGE = 'change',
    ERROR = 'error',
}

interface IAction {
    type: Actions;
    value: string;
}

type TOAuthProviderRecord<T> = Partial<Record<ProviderIdUnion, T>>;

const OAuthProviderIcon: TOAuthProviderRecord<Icons> = {
    [ProviderId.GOOGLE]: Icons.GOOGLE,
    [ProviderId.GITHUB]: Icons.GITHUB,
};

const OAuthProviderTitle: TOAuthProviderRecord<string> = {
    [ProviderId.GOOGLE]: 'Google',
    [ProviderId.GITHUB]: 'Github',
};

const reducer = (state: IInput, { type, value }: IAction) => {
    switch (type) {
        case Actions.CHANGE:
            return {
                ...state,
                value,
            };
        case Actions.ERROR:
            return {
                ...state,
                error: value,
            };
        default:
            return state;
    }
};

export const LoginContainer: FC<ILoginContainer> = (): JSX.Element => {
    const [emailState, dispatchEmail] = useReducer<TReducer>(reducer, {
        title: 'Email',
        value: '',
        error: '',
        icon: Icons.USER_TAG,
    });
    const [passwordState, dispatchPassword] = useReducer<TReducer>(reducer, {
        title: 'Пароль',
        value: '',
        error: '',
        icon: Icons.LOCK,
    });

    const [authError, setAuthError] = useState('');

    const { logInWithEmailAndPassword, logInWithPopup } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const oauthButtonClasses = classes['oauth-button'];

    const processLogin = (promise: TLoginResult) => {
        promise
            .then(() => navigate(state?.from || Pages.INDEX))
            .catch((error) => {
                setAuthError(error.message);
            });
    };

    const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchEmail({
            type: Actions.CHANGE,
            value: e.target.value,
        });
    };

    const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchPassword({
            type: Actions.CHANGE,
            value: e.target.value,
        });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: email } = emailState;
        const { value: password } = passwordState;

        let isValid = true;
        if (!validateEmail(email)) {
            isValid = false;
            dispatchEmail({
                type: Actions.ERROR,
                value: 'Некорректный email',
            });
        }
        if (!validatePassword(password)) {
            isValid = false;
            dispatchPassword({
                type: Actions.ERROR,
                value: 'Пароль должен быть не менее 8-ми символов',
            });
        }

        if (isValid) {
            processLogin(logInWithEmailAndPassword(email, password));
        }
    };

    const oauthButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLButtonElement;
        const providerId = button.dataset.providerId as ProviderIdUnion;

        processLogin(logInWithPopup(providerId));
    };

    const renderOAuthButtons = (): JSX.Element => {
        return (
            <div className={classes['oauth-container']}>
                {(Object.keys(ALLOWED_OAUTH_PROVIDERS) as ProviderIdUnion[]).map((providerId) => (
                    <Button
                        key={providerId}
                        className={oauthButtonClasses}
                        variant={Buttons.OUTLINE}
                        onClick={oauthButtonClickHandler}
                        data-provider-id={providerId}
                    >
                        <Icon className={classes['oauth-icon']} icon={OAuthProviderIcon[providerId]!} />
                        {OAuthProviderTitle[providerId]}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className={classes['login-container']}>
            <h3 className={classes['heading']}>Добро пожаловать!</h3>
            <LoginForm
                email={{
                    ...emailState,
                    onChange: changeEmailHandler,
                }}
                password={{
                    ...passwordState,
                    onChange: changePasswordHandler,
                }}
                error={authError}
                onSubmit={submitHandler}
            />
            <div className={classes['delimiter']}>
                <div className={classes['delimiter-text']}>Или войдите через</div>
            </div>
            {renderOAuthButtons()}
            <div className={classes['without-account-container']}>
                Ещё нет аккаунта?{' '}
                <Link to={Pages.REGISTRATION} className={classes['text-primary']}>
                    Зарегистрируйтесь!
                </Link>
            </div>
        </div>
    );
};
