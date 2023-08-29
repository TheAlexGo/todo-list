import React, { type FC, type JSX, useEffect, useRef } from 'react';

import { Icon } from '@components/Icon/Icon';

import { SubMenuItem } from '../SubMenuItem/SubMenuItem';

import type { ISubMenuItem } from '../SubMenuItem/SubMenuItem';
import type { Icons } from '@components/Icon/Icon';
import type { TMenuItemExpanded } from '@hooks/useMenu';

import classes from './MenuItemExpanded.module.scss';

export interface IMenuItemExpanded {
    icon: Icons;
    label: string;
}

type MenuItemExpandedProps = TMenuItemExpanded<IMenuItemExpanded, ISubMenuItem>;

export const MenuItemExpanded: FC<MenuItemExpandedProps> = ({
    icon,
    label,
    elements,
    menuItemIndex,
    currentSubMenuItemIndex,
    isSelected,
    withFocus,
    clickMenuItemHandler,
    clickSubMenuItemHandler,
    keyDownMenuItemHandler,
    keyDownSubMenuItemHandler,
    focusMenuItemHandler,
    focusSubMenuItemHandler,
    blurMenuItemHandler,
    blurSubMenuItemHandler,
    ...props
}): JSX.Element => {
    const hasChildren = props['aria-haspopup'];
    const isExpanded = props['aria-expanded'];
    const tabExpandedRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (withFocus) {
            tabExpandedRef.current?.focus();
        }
    }, [withFocus]);

    return (
        <li
            {...props}
            role="menuitem"
            className={classes.item}
            onKeyDown={keyDownMenuItemHandler}
            onClick={clickMenuItemHandler}
            onFocus={focusMenuItemHandler}
            onBlur={blurMenuItemHandler}
            data-menu-index={menuItemIndex}
            data-sub-menu-index={currentSubMenuItemIndex}
            aria-label={label}
            ref={tabExpandedRef}
        >
            <Icon className={classes.icon} icon={icon} size={24} />
            {isExpanded && hasChildren && (
                <ul role="menu" className={classes.list}>
                    {elements.map((subItem) => (
                        <SubMenuItem
                            {...subItem}
                            key={subItem.id}
                            keyDownSubMenuItemHandler={keyDownSubMenuItemHandler}
                            clickSubMenuItemHandler={clickSubMenuItemHandler}
                            focusSubMenuItemHandler={focusSubMenuItemHandler}
                            blurSubMenuItemHandler={blurSubMenuItemHandler}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};
