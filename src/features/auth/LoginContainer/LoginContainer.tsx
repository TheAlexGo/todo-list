import React, { FC, FormEvent, JSX, useState } from 'react';

import { AuthProvider as IOAuthProvider } from '@firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ALLOWED_OAUTH_PROVIDERS, ProviderIdUnion, useAuth } from '@providers/AuthProvider';
import { validateEmail, validatePassword } from '@utils/validate';
import { Icons } from '@components/Icon/Icon';
import { OAuthLoginForm } from '@components/OAuthLoginForm/OAuthLoginForm';
import { LoginForm } from '@components/forms/LoginForm/LoginForm';
import { useFieldReducer } from '../base/useFieldReducer';
import { OAuthProviderIcons, OAuthProviderTitles } from '../base/constants';
import { IInput } from '@components/inputs/Input/Input';
import { Pages, TAuthResult } from '@types';

import classes from '../base/Base.modules.scss';

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
            <h3 className={classes['heading']}>Добро пожаловать!</h3>
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
            <div className={classes['delimiter']}>
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
