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
import { Pages, TAuthResult } from '@types';
import { Actions } from '../base/types';

import classes from '../base/Base.modules.scss';

export const LoginContainer: FC = (): JSX.Element => {
    const [emailState, dispatchEmail, emailChangeHandler] = useFieldReducer('Email', Icons.USER_TAG);
    const [passwordState, dispatchPassword, passwordChangeHandler] = useFieldReducer('Пароль', Icons.LOCK);

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
