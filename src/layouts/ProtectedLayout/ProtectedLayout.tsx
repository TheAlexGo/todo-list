import React, { FC, JSX } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@providers/AuthProvider';
import { Loader, LoaderSizes } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { Logger } from '@services/logger';
import { INavItem } from '@components/Navigation/components/NavItem/NavItem';
import { Icons } from '@components/Icon/Icon';
import { Pages } from '@types';

import classes from './ProtectedLayout.module.scss';

interface IProtectedLayout {
    withNavigation?: boolean;
}

export const ProtectedLayout: FC<IProtectedLayout> = ({ withNavigation = false }): JSX.Element => {
    const location = useLocation();
    const { isAuthenticate } = useAuth();

    if (isAuthenticate === null) {
        return <Loader size={LoaderSizes.XL} isFixedOnCenter />;
    }

    if (!isAuthenticate) {
        return <Navigate to={Pages.LOGIN} state={{ from: location }} />;
    }

    const createTask = () => {
        Logger.info('Создание таски');
    };

    const navs: INavItem[] = [
        {
            icon: Icons.HOME,
            title: 'Главная',
            to: Pages.INDEX,
        },
        {
            icon: Icons.ADD,
            to: Pages.CREATE_TASK,
            className: classes['add-button'],
            onClick: createTask,
        },
        {
            icon: Icons.SETTINGS,
            title: 'Настройки',
            to: Pages.SETTINGS,
        },
    ];

    return (
        <div className={classes['layout']}>
            <Outlet />
            {withNavigation && <Navigation elements={navs} />}
        </div>
    );
};
