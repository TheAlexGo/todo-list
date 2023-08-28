import React, { type FC, type JSX, useEffect, useRef } from 'react';

import { Button } from '@components/Button/Button';
import { type TSubMenuItemFull } from '@hooks/useMenu';

import classes from './SubMenuItem.module.scss';

export interface ISubMenuItem {
    onClick: () => void;
}

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
    onClick,
    ...props
}): JSX.Element => {
    const subMenuItemRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (withFocus) {
            subMenuItemRef.current?.focus();
        }
    }, [subMenuItemRef, withFocus]);

    return (
        <Button
            {...props}
            id={id}
            role="menuitem"
            className={classes.item}
            onKeyDown={keyDownSubMenuItemHandler}
            onClick={onClick}
            onFocus={focusSubMenuItemHandler}
            onBlur={blurSubMenuItemHandler}
            ref={subMenuItemRef}
        >
            {title}
        </Button>
    );
};
