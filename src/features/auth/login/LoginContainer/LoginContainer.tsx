import React, { ChangeEvent, FC, FormEvent, JSX, Reducer, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { Button, Buttons } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { IInput } from '@components/Input/Input';
import { LoginForm } from '@components/LoginForm/LoginForm';
import { Pages } from '@types';

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

const reducer = (state: IInput, { type, value }: IAction) => {
    switch (type) {
        case Actions.CHANGE:
            return {
                ...state,
                value,
            };
        default:
            return state;
    }
};

export const LoginContainer: FC<ILoginContainer> = (): JSX.Element => {
    const [emailState, dispatchEmail] = useReducer<TReducer>(reducer, {
        title: 'Email',
        value: '',
        icon: Icons.USER_TAG,
    });

    const [passwordState, dispatchPassword] = useReducer<TReducer>(reducer, {
        title: 'Пароль',
        value: '',
        icon: Icons.LOCK,
    });

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
    };

    const renderOAuthButtons = (): JSX.Element => {
        return (
            <div className={classes['oauth-container']}>
                <Button className={classes['oauth-button']} variant={Buttons.OUTLINE}>
                    <Icon className={classes['oauth-icon']} icon={Icons.GOOGLE} />
                    Google
                </Button>
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
                onSubmit={submitHandler}
            />
            <div className={classes['delimiter']}>
                <div className={classes['delimiter-text']}>Или войдите через</div>
            </div>
            {renderOAuthButtons()}
            <div className={classes['without-account-container']}>
                Ещё нет аккаунта?{' '}
                <Link to={Pages.LOGIN} className={classes['text-primary']}>
                    Зарегистрируйтесь!
                </Link>
            </div>
        </div>
    );
};
