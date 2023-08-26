import React, { type FC, type JSX, type ButtonHTMLAttributes } from 'react';

import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { Button } from '@components/Button/Button';
import { Icon } from '@components/Icon/Icon';

import type { Icons } from '@components/Icon/Icon';
import type { NavLinkProps } from 'react-router-dom';

import classes from './NavItem.module.scss';

type TCoreProps = NavLinkProps | TButtonProps;

export interface INavItemCore {
    icon: Icons;
    to?: string;
    title: string;
    isInvisibleTitle?: boolean;
}

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type TNavPropsLink = NavLinkProps & INavItemCore;

type TNavPropsButton = TButtonProps & INavItemCore;

export type INavItem = TNavPropsLink | TNavPropsButton;

const isLink = (props: TCoreProps): props is NavLinkProps => (props as NavLinkProps).to !== undefined;

export const NavItem: FC<INavItem> = ({ icon, title, isInvisibleTitle = false, ..._props }): JSX.Element => {
    const props = _props as TCoreProps;

    const location = useLocation();

    const rootClasses = cn(classes.item, props.className);

    const renderContent = () => (
        <>
            <Icon className={classes.icon} icon={icon} size={24} />
            <span
                className={cn(classes.title, {
                    [classes['__is-invisible']]: isInvisibleTitle,
                })}
            >
                {title}
            </span>
        </>
    );

    const renderElement = () => {
        if (isLink(props)) {
            return (
                <NavLink
                    {...props}
                    className={({ isActive }) =>
                        cn(rootClasses, {
                            [classes['__is-active']]: isActive,
                        })
                    }
                    state={{ from: location }}
                    title={`Перейти на страницу ${title}`}
                >
                    {renderContent()}
                </NavLink>
            );
        }

        return (
            <Button {...props} className={rootClasses}>
                {renderContent()}
            </Button>
        );
    };
    return <li className={classes.wrapper}>{renderElement()}</li>;
};
