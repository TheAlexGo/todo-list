import React, { FC, JSX, ButtonHTMLAttributes } from 'react';

import { NavLink, NavLinkProps } from 'react-router-dom';

import { Icon, Icons } from '@components/Icon/Icon';

import classes from './NavItem.module.scss';
import cn from 'classnames';
import { Button } from '@components/Button/Button';

type TCoreProps = NavLinkProps | TButtonProps;

export interface INavItemCore {
    icon: Icons;
    to?: string;
    title?: string;
}

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type TNavPropsLink = NavLinkProps & INavItemCore;

type TNavPropsButton = TButtonProps & INavItemCore;

export type INavItem = TNavPropsLink | TNavPropsButton;

const isLink = (props: TCoreProps): props is NavLinkProps => {
    return (props as NavLinkProps).to !== undefined;
};

export const NavItem: FC<INavItem> = ({ icon, title, ..._props }): JSX.Element => {
    const props = _props as TCoreProps;

    const rootClasses = cn(classes['item'], props.className);

    const renderElement = () => {
        if (isLink(props)) {
            return (
                <NavLink
                    {...props}
                    className={({ isActive }) => {
                        return cn(rootClasses, {
                            [classes['__is-active']]: isActive,
                        });
                    }}
                >
                    <Icon className={classes['icon']} icon={icon} size={24} />
                    {title}
                </NavLink>
            );
        }

        return <Button {...props} className={rootClasses}></Button>;
    };
    return <li className={classes['wrapper']}>{renderElement()}</li>;
};