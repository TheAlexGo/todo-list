import { Loader } from '@components/Loader/Loader';
import React, { FC, JSX, lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout/ProtectedLayout';
import { Pages } from '@types';

const General = lazy(() => import('@pages/General/General').then(({ General }) => ({ default: General })));
const Login = lazy(() => import('@pages/Login/Login').then(({ Login }) => ({ default: Login })));
const Registration = lazy(() =>
    import('@pages/Registration/Registration').then(({ Registration }) => ({ default: Registration })),
);

export const App: FC = (): JSX.Element => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={Pages.INDEX} element={<ProtectedLayout />}>
                    <Route index element={<General />} />
                </Route>
                <Route path={Pages.LOGIN} element={<AuthLayout />}>
                    <Route index element={<Login />} />
                </Route>
                <Route path={Pages.REGISTRATION} element={<AuthLayout />}>
                    <Route index element={<Registration />} />
                </Route>
                <Route path="*" element={<Navigate to={Pages.INDEX} />} />
            </Routes>
        </Suspense>
    );
};
