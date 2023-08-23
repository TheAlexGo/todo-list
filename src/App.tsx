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
const ReadTask = lazy(() => import('@pages/ReadTask/ReadTask').then(({ ReadTask }) => ({ default: ReadTask })));

export const App: FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path={Pages.INDEX} element={<ProtectedLayout withNavigation />}>
                <Route index element={<General />} />
                <Route path={Pages.SETTINGS} element={<Settings />} />
            </Route>
            <Route path={Pages.TASK} element={<ProtectedLayout />}>
                <Route path=":id" element={<ReadTask />} />
                <Route path="create" element={<CreateTask />} />
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
