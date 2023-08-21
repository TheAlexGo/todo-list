import React, { FC, JSX } from 'react';

interface ILoader {}

export const Loader: FC<ILoader> = (): JSX.Element => {
    return <h1>Загрузка...</h1>;
};
