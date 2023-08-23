import React, { FC, JSX } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Icon, Icons } from '@components/Icon/Icon';
import { Button } from '@components/Button/Button';

import classes from './Header.module.scss';

export interface IAction {
    icon: Icons;
    onClick: () => void;
}

interface IHeader {
    title: string;
    action?: IAction;
}

export const Header: FC<IHeader> = ({ title, action }): JSX.Element => {
    const navigate = useNavigate();
    const { state } = useLocation();

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

    return (
        <header className={classes['header']}>
            <Button onClick={backClickHandler}>
                <Icon icon={Icons.ARROW_LEFT} size={24} />
            </Button>
            {title}
            <div className={classes['container-action']}>{renderAction()}</div>
        </header>
    );
};
