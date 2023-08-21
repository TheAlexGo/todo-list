import React, { FC, JSX } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@providers/AuthProvider';
import { Icon, Icons } from '@components/Icon/Icon';
import { Pages } from '@types';

import classes from './AuthLayout.module.scss';

interface IAuthLayout {}

export const AuthLayout: FC<IAuthLayout> = (): JSX.Element => {
    const { isAuthenticate } = useAuth();

    if (isAuthenticate) {
        return <Navigate to={Pages.INDEX} />;
    }

    return (
        <div className={classes['wrapper']}>
            <div className={classes['logo-container']}>
                <Icon icon={Icons.LOGO} width={92} isCustomSize />
                <Icon icon={Icons.LOGO_TEXT} width={140} isCustomSize />
            </div>
            <Outlet />
        </div>
    );
};
