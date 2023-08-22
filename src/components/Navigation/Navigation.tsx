import React, { FC } from 'react';

import { INavItem, NavItem } from './components/NavItem/NavItem';

import classes from './Navigation.module.scss';

interface INavigation {
    elements: INavItem[];
}

export const Navigation: FC<INavigation> = ({ elements }): JSX.Element => {
    return (
        <nav>
            <ul className={classes['navigation']}>
                {elements.map((el) => (
                    <NavItem key={el.to} {...el} />
                ))}
            </ul>
        </nav>
    );
};
