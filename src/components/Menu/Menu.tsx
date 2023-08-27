import React, { type FC, type JSX } from 'react';

import cn from 'classnames';

import { type IMenuItem, MenuItem } from '@components/Menu/components/MenuItem/MenuItem';
import {
    type IMenuItemExpanded,
    MenuItemExpanded,
} from '@components/Menu/components/MenuItemExpanded/MenuItemExpanded';
import { type ISubMenuItem } from '@components/Menu/components/SubMenuItem/SubMenuItem';
import { isMenuItemExpanded, type IUseMenu, useMenu } from '@hooks/useMenu';

import classes from './Menu.module.scss';

interface IMenu {
    id: string;
    items: IUseMenu<IMenuItem, IMenuItemExpanded, ISubMenuItem>['items'];
}

export const Menu: FC<IMenu> = ({ id, items }): JSX.Element => {
    const {
        menuItems,
        clickMenuItemHandler,
        clickSubMenuItemHandler,
        keyDownMenuItemHandler,
        keyDownSubMenuItemHandler,
        focusMenuItemHandler,
        focusSubMenuItemHandler,
        blurMenuItemHandler,
        blurSubMenuItemHandler,
    } = useMenu<IMenuItem, IMenuItemExpanded, ISubMenuItem>({
        menuId: id,
        items,
    });

    const rootClasses = cn(classes.menu);

    return (
        <ul id={id} role="menu" className={rootClasses} aria-label="Элементы меню">
            {menuItems.map((tab) => {
                if (isMenuItemExpanded(tab)) {
                    return (
                        <MenuItemExpanded
                            {...tab}
                            key={tab.id}
                            clickMenuItemHandler={clickMenuItemHandler}
                            clickSubMenuItemHandler={clickSubMenuItemHandler}
                            keyDownMenuItemHandler={keyDownMenuItemHandler}
                            keyDownSubMenuItemHandler={keyDownSubMenuItemHandler}
                            focusMenuItemHandler={focusMenuItemHandler}
                            focusSubMenuItemHandler={focusSubMenuItemHandler}
                            blurMenuItemHandler={blurMenuItemHandler}
                            blurSubMenuItemHandler={blurSubMenuItemHandler}
                        />
                    );
                }

                return (
                    <MenuItem
                        {...tab}
                        key={tab.id}
                        clickMenuItemHandler={clickMenuItemHandler}
                        keyDownMenuItemHandler={keyDownMenuItemHandler}
                        focusMenuItemHandler={focusMenuItemHandler}
                        blurMenuItemHandler={blurMenuItemHandler}
                    />
                );
            })}
        </ul>
    );
};
