import React, { FC, JSX } from 'react';

import { useAuth } from '@providers/AuthProvider';

import classes from './Greetings.module.scss';

interface IGreetings {}

export const Greetings: FC<IGreetings> = (): JSX.Element => {
    const { user } = useAuth();
    return (
        <header>
            <h1 className={classes.greetings}>
                Добро пожаловать!
                <br />
                <span className={classes.name}>{user?.name}</span>
            </h1>
        </header>
    );
};
