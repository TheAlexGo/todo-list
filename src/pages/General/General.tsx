import React, { FC, JSX } from 'react';

import { Greetings } from '@components/Greetings/Greetings';

import classes from './General.module.scss';

export const General: FC = (): JSX.Element => {
    return (
        <div className={classes['general']}>
            <Greetings />
        </div>
    );
};
