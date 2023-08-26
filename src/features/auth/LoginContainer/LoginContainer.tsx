import React, { useState, type FC, type FormEvent, type JSX } from 'react';

import { validateEmail, validatePassword } from '@utils/validate';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Icons } from '@components/Icon/Icon';
import { OAuthLoginForm } from '@components/OAuthLoginForm/OAuthLoginForm';
import { LoginForm } from '@components/forms/LoginForm/LoginForm';
import { ALLOWED_OAUTH_PROVIDERS, useAuth } from '@providers/AuthProvider';

import { Pages } from '@types';
import type { ProviderIdUnion, TAuthResult } from '@types';

import type { IInput } from '@components/inputs/Input/Input';
import type { AuthProvider as IOAuthProvider } from '@firebase/auth';

import classes from '../base/Base.modules.scss';

import { OAuthProviderIcons, OAuthProviderTitles } from '../base/constants';
import { useFieldReducer } from '../base/useFieldReducer';

export const LoginContainer: FC = (): JSX.Element => {
    const [emailState, emailChangeHandler, emailErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Email',
        icon: Icons.USER_TAG,
    });
    const [passwordState, passwordChangeHandler, passwordErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Пароль',
        icon: Icons.LOCK,
    });

    const [authError, setAuthError] = useState('');

    const { logInWithEmailAndPassword, logInWithPopup } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const processLogin = (promise: TAuthResult) => {
        promise
            .then(() => navigate(state?.from || Pages.INDEX))
            .catch((error) => {
                setAuthError(error.message);
            });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: email } = emailState;
        const { value: password } = passwordState;

        let isValid = true;
        if (!validateEmail(email)) {
            isValid = false;
            emailErrorHandler('Некорректный email');
        }
        if (!validatePassword(password)) {
            isValid = false;
            passwordErrorHandler('Пароль должен быть не менее 8-ми символов');
        }

        if (isValid) {
            processLogin(logInWithEmailAndPassword(email, password));
        }
    };

    const oauthButtonClickHandler = (providerId: ProviderIdUnion) => {
        processLogin(logInWithPopup(providerId));
    };

    return (
        <div>
            <h1 className={classes.heading}>Добро пожаловать!</h1>
            <LoginForm
                email={{
                    ...emailState,
                    onChange: emailChangeHandler,
                }}
                password={{
                    ...passwordState,
                    onChange: passwordChangeHandler,
                }}
                error={authError}
                onSubmit={submitHandler}
            />
            <div className={classes.delimiter}>
                <div className={classes['delimiter-text']}>Или войдите через</div>
            </div>
            <OAuthLoginForm<ProviderIdUnion, IOAuthProvider>
                providers={ALLOWED_OAUTH_PROVIDERS}
                icons={OAuthProviderIcons}
                titles={OAuthProviderTitles}
                onClick={oauthButtonClickHandler}
            />
            <div className={classes['additional-container']}>
                Ещё нет аккаунта?{' '}
                <Link to={Pages.REGISTRATION} className={classes['text-primary']}>
                    Зарегистрируйтесь!
                </Link>
            </div>
        </div>
    );
};
