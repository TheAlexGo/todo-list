import { Loader } from '@components/Loader/Loader';
import React, { FC, JSX, lazy, Suspense } from 'react';

import { LoginContainer } from '@features/auth/login/LoginContainer/LoginContainer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout/ProtectedLayout';
import { Pages } from '@types';

const General = lazy(() => import('@pages/General/General').then(({ General }) => ({ default: General })));

export const App: FC = (): JSX.Element => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={Pages.INDEX} element={<ProtectedLayout />}>
                    <Route index element={<General />} />
                </Route>
                <Route path={Pages.LOGIN} element={<AuthLayout />}>
                    <Route index element={<LoginContainer />} />
                </Route>
                <Route path="*" element={<Navigate to={Pages.INDEX} />} />
            </Routes>
        </Suspense>
    );
};
