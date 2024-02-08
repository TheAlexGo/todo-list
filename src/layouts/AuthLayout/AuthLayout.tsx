import React, { type FC, type JSX, Suspense } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { Icon, Icons } from '@components/Icon/Icon';
import { Loader, LoaderPositions, LoaderSizes } from '@components/Loader/Loader';
import { useAuth } from '@providers/AuthProvider';

import { Pages } from '@types';

import classes from './AuthLayout.module.scss';

interface IAuthLayout {}

export const AuthLayout: FC<IAuthLayout> = (): JSX.Element => {
    const { isAuthenticate } = useAuth();

    if (isAuthenticate) {
        return <Navigate to={Pages.INDEX} />;
    }

    return (
        <div className={classes.wrapper}>
            <header className={classes['logo-container']}>
                <Icon icon={Icons.LOGO} width={92} isCustomSize />
                <Icon icon={Icons.LOGO_TEXT} width={140} isCustomSize />
            </header>

            <Suspense fallback={<Loader size={LoaderSizes.XL} position={LoaderPositions.FIXED_ON_CENTER} />}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
        </div>
    );
};
