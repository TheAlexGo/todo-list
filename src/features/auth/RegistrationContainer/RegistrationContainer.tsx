import React, { useState, type FC, type FormEvent, type JSX } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Icons } from '@components/Icon/Icon';
import { OAuthLoginForm } from '@components/OAuthLoginForm/OAuthLoginForm';
import { RegistrationForm } from '@components/forms/RegistrationForm/RegistrationForm';
import { ALLOWED_OAUTH_PROVIDERS, useAuth } from '@providers/AuthProvider';
import { validateEmail, validateName, validatePassword, validatePrivacy } from '@utils/validate';

import { Pages } from '@types';
import type { ProviderIdUnion, TAuthResult } from '@types';

import { OAuthProviderIcons, OAuthProviderTitles } from '../base/constants';
import { useFieldReducer } from '../base/useFieldReducer';

import type { IInput } from '@components/inputs/Input/Input';
import type { AuthProvider as IOAuthProvider } from '@firebase/auth';

import classes from '../base/Base.module.scss';

export const RegistrationContainer: FC = (): JSX.Element => {
    const [nameState, nameChangeHandler, nameErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Имя',
        icon: Icons.USER,
    });
    const [emailState, emailChangeHandler, emailErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Email',
        icon: Icons.USER_TAG,
    });
    const [passwordState, passwordChangeHandler, passwordErrorHandler] = useFieldReducer<IInput, HTMLInputElement>({
        title: 'Пароль',
        icon: Icons.LOCK,
    });
    const [isPrivacySelected, setIsPrivacySelected] = useState(false);

    const [authError, setAuthError] = useState('');

    const { logInWithPopup, signUpWithCredentials } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const processRegistration = (promise: TAuthResult) => {
        promise
            .then(() => navigate(state?.from || Pages.INDEX))
            .catch((error) => {
                setAuthError(error.message);
            });
    };

    const oauthButtonClickHandler = (providerId: ProviderIdUnion) => {
        processRegistration(logInWithPopup(providerId));
    };

    const privacyChangeHandler = () => {
        setIsPrivacySelected(!isPrivacySelected);
        setAuthError('');
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { value: name } = nameState;
        const { value: email } = emailState;
        const { value: password } = passwordState;

        let isValid = true;
        if (!validateName(name)) {
            isValid = false;
            nameErrorHandler('Некорректное имя');
        }
        if (!validateEmail(email)) {
            isValid = false;
            emailErrorHandler('Некорректный email');
        }
        if (!validatePassword(password)) {
            isValid = false;
            passwordErrorHandler('Пароль должен быть не менее 8-ми символов');
        }
        if (!validatePrivacy(isPrivacySelected)) {
            isValid = false;
            setAuthError('Подвердите обработку персональных данных!');
        }

        if (isValid) {
            processRegistration(signUpWithCredentials(name, email, password));
        }
    };

    return (
        <div>
            <h1 className={classes.heading}>Создайте свой аккаунт</h1>
            <RegistrationForm
                name={{
                    ...nameState,
                    onChange: nameChangeHandler,
                }}
                email={{
                    ...emailState,
                    onChange: emailChangeHandler,
                }}
                password={{
                    ...passwordState,
                    onChange: passwordChangeHandler,
                }}
                privacy={{
                    id: window.crypto.randomUUID(),
                    title: 'Ставя галочку, вы даёте согласие на обработку ваших персональных данных',
                    isSelected: isPrivacySelected,
                    onChange: privacyChangeHandler,
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
                У вас уже есть аккаунт?{' '}
                <Link to={Pages.LOGIN} className={classes['text-primary']}>
                    Входите!
                </Link>
            </div>
        </div>
    );
};
