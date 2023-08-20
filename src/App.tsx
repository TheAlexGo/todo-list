import { Pages } from '@types';
import React, { FC, JSX } from 'react';

import { LoginContainer } from '@features/auth/login/LoginContainer/LoginContainer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';

export const App: FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path={Pages.LOGIN} element={<AuthLayout />}>
                <Route index element={<LoginContainer />} />
            </Route>
            <Route path="*" element={<Navigate to={Pages.INDEX} />} />
        </Routes>
    );
};
