import React, { type FC, type JSX } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { back } from '@services/routing';

import { Pages } from '@types';

import classes from './NotFound.module.scss';

export const NotFound: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const clickHandler = () => {
        back(state, navigate, Pages.NOT_FOUND);
    };

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.heading}>
                <span className={classes.number}>404</span>
                <br /> Ничего не найдено
            </h1>
            <Button view={Buttons.PRIMARY} onClick={clickHandler} size={ButtonSizes.XL}>
                Вернуться
            </Button>
        </div>
    );
};
