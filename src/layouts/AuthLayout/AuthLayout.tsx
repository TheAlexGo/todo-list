import React, { FC, JSX } from 'react';

import { Outlet } from 'react-router-dom';

import { Icon, Icons } from '@components/Icon/Icon';

import classes from './AuthLayout.module.scss';

interface IAuthLayout {}

export const AuthLayout: FC<IAuthLayout> = (): JSX.Element => {
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
