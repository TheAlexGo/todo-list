import React, { FC, JSX } from 'react';

import { useParams } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { RouteParams } from '@types';

export const ReadTask: FC = (): JSX.Element => {
    const { id } = useParams<Pick<RouteParams, 'id'>>();

    return (
        <>
            <Header title="Подробности" />
            <main>Таска с id {id}</main>
        </>
    );
};
