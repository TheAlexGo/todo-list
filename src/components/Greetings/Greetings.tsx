import React, { type FC, type JSX, type HTMLAttributes } from 'react';

import { useAuth } from '@providers/AuthProvider';

import classes from './Greetings.module.scss';

interface IGreetings {}

type GreetingsProps = IGreetings & HTMLAttributes<HTMLElement>;

export const Greetings: FC<GreetingsProps> = ({ ...props }): JSX.Element => {
    const { user } = useAuth();
    return (
        <header {...props}>
            <h1 className={classes.greetings}>
                Добро пожаловать!
                <br />
                <span className={classes.name}>{user?.name}</span>
            </h1>
        </header>
    );
};
