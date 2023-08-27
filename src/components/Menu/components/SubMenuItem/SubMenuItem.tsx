import React, { type FC, type JSX, useEffect, useRef } from 'react';

import { type TSubMenuItemFull } from '@hooks/useMenu';

export interface ISubMenuItem {}

type SubMenuItemProps = TSubMenuItemFull<ISubMenuItem>;

export const SubMenuItem: FC<SubMenuItemProps> = ({
    id,
    title,
    withFocus,
    isSelected,
    keyDownSubMenuItemHandler,
    clickSubMenuItemHandler,
    focusSubMenuItemHandler,
    blurSubMenuItemHandler,
    ...props
}): JSX.Element => {
    const subMenuItemRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (withFocus) {
            subMenuItemRef.current?.focus();
        }
    }, [subMenuItemRef, withFocus]);

    return (
        <li
            {...props}
            id={id}
            role="menuitem"
            onKeyDown={keyDownSubMenuItemHandler}
            onClick={clickSubMenuItemHandler}
            onFocus={focusSubMenuItemHandler}
            onBlur={blurSubMenuItemHandler}
            ref={subMenuItemRef}
        >
            {title}
        </li>
    );
};
