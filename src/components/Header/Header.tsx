import React, { useEffect, useRef, type FC, type HTMLAttributes, type JSX } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';

import classes from './Header.module.scss';

export interface IAction {
    icon: Icons;
    onClick: () => void;
}

interface IHeader {
    text: string;
    action?: IAction;
}

interface HeaderProps extends IHeader, HTMLAttributes<HTMLElement> {}

export const Header: FC<HeaderProps> = ({ text, action, ...props }): JSX.Element => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const returnButtonRef = useRef<HTMLButtonElement>(null);

    const backClickHandler = () => {
        navigate(state?.from || -1);
    };

    const renderAction = (): JSX.Element | null => {
        if (!action) {
            return null;
        }

        return (
            <Button onClick={action.onClick}>
                <Icon icon={action.icon} size={24} />
            </Button>
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
