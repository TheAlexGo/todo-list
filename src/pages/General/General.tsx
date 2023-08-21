import React, { FC, JSX, useEffect } from 'react';

import { useAuth } from '@providers/AuthProvider';

import classes from './General.module.scss';

export const General: FC = (): JSX.Element => {
    const { user } = useAuth();
    useEffect(() => {
        if (!user) {
            return;
        }
    }, []);

    return <div className={classes['general']}>Привет, {user?.name}!</div>;
};
