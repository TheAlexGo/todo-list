import React, { type FC, type HTMLAttributes } from 'react';

import type { INavItem } from './components/NavItem/NavItem';

import classes from './Navigation.module.scss';

import { NavItem } from './components/NavItem/NavItem';

interface INavigation {
    elements: INavItem[];
}

interface NavigationProps extends INavigation, HTMLAttributes<HTMLElement> {}

export const Navigation: FC<NavigationProps> = ({ elements, ...props }): JSX.Element => (
    <nav className={classes.wrapper} {...props}>
        <ul className={classes.navigation}>
            {elements.map((el) => (
                <NavItem key={el.to} {...el} />
            ))}
        </ul>
    </nav>
);
