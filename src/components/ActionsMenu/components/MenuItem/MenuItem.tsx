import React, { type FC, type JSX, useEffect, useRef } from 'react';

import { type TMenuItemSimple } from '@hooks/useMenu';

export interface IMenuItem {}

type MenuItemProps = TMenuItemSimple<IMenuItem>;

export const MenuItem: FC<MenuItemProps> = ({
    title,
    keyDownMenuItemHandler,
    clickMenuItemHandler,
    focusMenuItemHandler,
    blurMenuItemHandler,
    withFocus,
    menuItemIndex,
    isSelected,
    ...props
}): JSX.Element => {
    const menuItemRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (withFocus) {
            menuItemRef.current?.focus();
        }
    }, [withFocus]);

    return (
        <li
            role="menuitem"
            onKeyDown={keyDownMenuItemHandler}
            onClick={clickMenuItemHandler}
            onFocus={focusMenuItemHandler}
            onBlur={blurMenuItemHandler}
            data-menu-index={menuItemIndex}
            {...props}
        >
            {title}
        </li>
    );
};
