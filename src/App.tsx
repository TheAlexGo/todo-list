import React, { FC, JSX, lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Pages } from '@types';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout/ProtectedLayout';

const GeneralPage = lazy(() => import('@pages/General/General').then(({ General }) => ({ default: General })));
const LoginPage = lazy(() => import('@pages/Login/Login').then(({ Login }) => ({ default: Login })));
const RegistrationPage = lazy(() =>
    import('@pages/Registration/Registration').then(({ Registration }) => ({ default: Registration })),
);
const CreateTaskPage = lazy(() =>
    import('@pages/CreateTask/CreateTask').then(({ CreateTask }) => ({ default: CreateTask })),
);
const SettingsPage = lazy(() => import('@pages/Settings/Settings').then(({ Settings }) => ({ default: Settings })));
const ReadTaskPage = lazy(() => import('@pages/ReadTask/ReadTask').then(({ ReadTask }) => ({ default: ReadTask })));

export const App: FC = (): JSX.Element => (
    <Routes>
        <Route path={Pages.INDEX} element={<ProtectedLayout withNavigation />}>
            <Route index element={<GeneralPage />} />
            <Route path={Pages.SETTINGS} element={<SettingsPage />} />
        </Route>
        <Route path={Pages.TASK} element={<ProtectedLayout />}>
            <Route path=":id" element={<ReadTaskPage />} />
            <Route path="create" element={<CreateTaskPage />} />
        </Route>
        <Route path={Pages.LOGIN} element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
        </Route>
        <Route path={Pages.REGISTRATION} element={<AuthLayout />}>
            <Route index element={<RegistrationPage />} />
        </Route>
        <Route path="*" element={<Navigate to={Pages.INDEX} />} />
    </Routes>
);
