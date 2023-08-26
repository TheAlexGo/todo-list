import React, { FC, JSX, ButtonHTMLAttributes } from 'react';

import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

import { Icon, Icons } from '@components/Icon/Icon';

import cn from 'classnames';
import { Button } from '@components/Button/Button';
import classes from './NavItem.module.scss';

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

const isLink = (props: TCoreProps): props is NavLinkProps => (props as NavLinkProps).to !== undefined;

export const NavItem: FC<INavItem> = ({ icon, title, ..._props }): JSX.Element => {
    const props = _props as TCoreProps;

    const location = useLocation();

    const rootClasses = cn(classes.item, props.className);

    const renderContent = () => (
        <>
            <Icon className={classes.icon} icon={icon} size={24} />
            {title}
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
