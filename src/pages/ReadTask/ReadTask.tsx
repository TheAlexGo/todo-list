import React, { type FC, type JSX } from 'react';

import { useParams } from 'react-router-dom';

import { Header } from '@components/Header/Header';

import type { RouteParams } from '@types';

export const ReadTask: FC = (): JSX.Element => {
    const { id } = useParams<Pick<RouteParams, 'id'>>();

    return (
        <>
            <Header text="Подробности" />
            <main>Таска с id {id}</main>
        </>
    );
};
