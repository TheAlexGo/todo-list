import React, { useEffect, useRef, type FC, type HTMLAttributes, type JSX } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { RoutingLink } from '@components/RoutingLink/RoutingLink';
import { back } from '@services/routing';

import { type Pages } from '@types';

import classes from './Header.module.scss';

type TActionCore = {
    icon: Icons;
    title: string;
};

type TActionWithButton = TActionCore & {
    onClick: () => void;
};

type TActionWithLink = TActionCore & {
    href: string;
};

export type TAction = TActionWithButton | TActionWithLink;

const isActionWithButton = (action: TAction): action is TActionWithButton =>
    (action as TActionWithButton)?.onClick !== undefined;

interface IHeader {
    text: string;
    page: Pages;
    action?: TAction;
}

interface HeaderProps extends IHeader, HTMLAttributes<HTMLElement> {}

export const Header: FC<HeaderProps> = ({ text, page, action, ...props }): JSX.Element => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const returnButtonRef = useRef<HTMLButtonElement>(null);

    const backClickHandler = () => {
        back(state, navigate, page);
    };

    const renderAction = (): JSX.Element | null => {
        if (!action) {
            return null;
        }

        if (isActionWithButton(action)) {
            return (
                <Button onClick={action.onClick} title={action.title}>
                    <Icon icon={action.icon} size={24} />
                </Button>
            );
        }

        return (
            <RoutingLink to={action.href} title={action.title}>
                <Icon icon={action.icon} size={24} />
            </RoutingLink>
        );
    };

    useEffect(() => {
        returnButtonRef.current?.focus();
    }, []);

    return (
        <header className={classes.header} {...props}>
            <Button onClick={backClickHandler} title="Вернуться назад" ref={returnButtonRef}>
                <Icon icon={Icons.ARROW_LEFT} size={24} />
            </Button>
            <h1 className={classes.heading}>{text}</h1>
            <div className={classes['container-action']}>{renderAction()}</div>
        </header>
    );
};
