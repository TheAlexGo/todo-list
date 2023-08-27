import React, { type FC, type JSX, Suspense } from 'react';

import cn from 'classnames';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Icons } from '@components/Icon/Icon';
import { Loader, LoaderPositions, LoaderSizes } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { useAuth } from '@providers/AuthProvider';
import { Logger } from '@services/logger';

import { Pages } from '@types';

import type { INavItem } from '@components/Navigation/components/NavItem/NavItem';

import classes from './ProtectedLayout.module.scss';

interface IProtectedLayout {
    withNavigation?: boolean;
}

export const ProtectedLayout: FC<IProtectedLayout> = ({ withNavigation = false }): JSX.Element => {
    const location = useLocation();
    const { isAuthenticate } = useAuth();

    const rootClasses = cn(classes.layout, {
        [classes['__with-navigation']]: withNavigation,
    });

    if (isAuthenticate === null) {
        return <Loader size={LoaderSizes.XL} position={LoaderPositions.FIXED_ON_CENTER} />;
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
            title: 'Создание задачи',
            to: Pages.CREATE_TASK,
            className: classes['add-button'],
            onClick: createTask,
            isInvisibleTitle: true,
        },
        {
            icon: Icons.SETTINGS,
            title: 'Настройки',
            to: Pages.SETTINGS,
        },
    ];

    return (
        <div className={rootClasses}>
            <Suspense fallback={<Loader size={LoaderSizes.XL} position={LoaderPositions.FIXED_ON_CENTER} />}>
                <Outlet />
            </Suspense>
            {withNavigation && <Navigation elements={navs} title="Основное меню" />}
        </div>
    );
};
