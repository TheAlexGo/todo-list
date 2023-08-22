import React, { FC, JSX } from 'react';

import { Greetings } from '@components/Greetings/Greetings';
import { Navigation } from '@components/Navigation/Navigation';
import { INavItem } from '@components/Navigation/components/NavItem/NavItem';
import { Icons } from '@components/Icon/Icon';
import { Pages } from '@types';

import classes from './General.module.scss';
import { Logger } from '@services/logger';

export const General: FC = (): JSX.Element => {
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
            to: Pages.INDEX,
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
        <div className={classes['general']}>
            <Greetings />
            <Navigation elements={navs} />
        </div>
    );
};
