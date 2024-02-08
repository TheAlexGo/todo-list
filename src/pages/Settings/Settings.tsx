import type { FC, JSX } from 'react';
import React from 'react';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { Header } from '@components/Header/Header';
import { useAuth } from '@providers/AuthProvider';

import { Pages } from '@types';

import classes from './Settings.module.scss';

export const Settings: FC = (): JSX.Element => {
    const { logOut } = useAuth();

    const logOutClickHandler = () => {
        logOut();
    };

    return (
        <>
            <Header page={Pages.SETTINGS} text="Настройки" />
            <main className={classes.container}>
                <h2 className={classes.heading}>Аккаунт</h2>
                <Button view={Buttons.PRIMARY} onClick={logOutClickHandler} size={ButtonSizes.XL} fullWidth>
                    Выйти
                </Button>
            </main>
        </>
    );
};
