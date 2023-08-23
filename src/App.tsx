import React, { FC, JSX, lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout/ProtectedLayout';
import { Pages } from '@types';

const General = lazy(() => import('@pages/General/General').then(({ General }) => ({ default: General })));
const Login = lazy(() => import('@pages/Login/Login').then(({ Login }) => ({ default: Login })));
const Registration = lazy(() =>
    import('@pages/Registration/Registration').then(({ Registration }) => ({ default: Registration })),
);
const CreateTask = lazy(() =>
    import('@pages/CreateTask/CreateTask').then(({ CreateTask }) => ({ default: CreateTask })),
);
const Settings = lazy(() => import('@pages/Settings/Settings').then(({ Settings }) => ({ default: Settings })));

export const App: FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path={Pages.INDEX} element={<ProtectedLayout withNavigation />}>
                <Route index element={<General />} />
                <Route path={Pages.SETTINGS} element={<Settings />} />
            </Route>
            <Route path={Pages.CREATE_TASK} element={<ProtectedLayout />}>
                <Route index element={<CreateTask />} />
            </Route>
            <Route path={Pages.LOGIN} element={<AuthLayout />}>
                <Route index element={<Login />} />
            </Route>
            <Route path={Pages.REGISTRATION} element={<AuthLayout />}>
                <Route index element={<Registration />} />
            </Route>
            <Route path="*" element={<Navigate to={Pages.INDEX} />} />
        </Routes>
    );
};
