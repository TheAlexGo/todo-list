import React, { lazy, type FC, type JSX } from 'react';

import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { loadSubTask, loadTask } from '@services/routing';

import { Pages } from '@types';

import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout/ProtectedLayout';

const GeneralPage = lazy(() => import('@pages/General/General').then(({ General }) => ({ default: General })));
const LoginPage = lazy(() => import('@pages/Login/Login').then(({ Login }) => ({ default: Login })));
const RegistrationPage = lazy(() =>
    import('@pages/Registration/Registration').then(({ Registration }) => ({ default: Registration })),
);
const CreateUpdateTaskPage = lazy(() =>
    import('@pages/CreateUpdateTask/CreateUpdateTask').then(({ CreateUpdateTask }) => ({ default: CreateUpdateTask })),
);
const SettingsPage = lazy(() => import('@pages/Settings/Settings').then(({ Settings }) => ({ default: Settings })));
const ReadTaskPage = lazy(() => import('@pages/ReadTask/ReadTask').then(({ ReadTask }) => ({ default: ReadTask })));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound').then(({ NotFound }) => ({ default: NotFound })));
const CreateUpdateSubTaskPage = lazy(() =>
    import('@pages/CreateUpdateSubTask/CreateUpdateSubTask').then(({ CreateUpdateSubTask }) => ({
        default: CreateUpdateSubTask,
    })),
);

export const App: FC = (): JSX.Element => (
    <RouterProvider
        router={createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route path={Pages.INDEX} element={<ProtectedLayout withNavigation />}>
                        <Route index element={<GeneralPage />} />
                        <Route path={Pages.SETTINGS} element={<SettingsPage />} />
                    </Route>
                    <Route path={Pages.TASKS} element={<ProtectedLayout />}>
                        <Route index element={<Navigate to={Pages.NOT_FOUND} />} />
                        <Route path=":id" element={<ReadTaskPage />} loader={loadTask} />
                        <Route path=":id/subtasks">
                            <Route path="create" element={<CreateUpdateSubTaskPage />} loader={loadSubTask} />
                            <Route
                                path=":subTaskId/update"
                                element={<CreateUpdateSubTaskPage />}
                                loader={loadSubTask}
                            />
                        </Route>
                        <Route path="create" element={<CreateUpdateTaskPage />} loader={loadTask} />
                        <Route path=":id/update" element={<CreateUpdateTaskPage />} loader={loadTask} />
                    </Route>
                    <Route path={Pages.LOGIN} element={<AuthLayout />}>
                        <Route index element={<LoginPage />} />
                    </Route>
                    <Route path={Pages.REGISTRATION} element={<AuthLayout />}>
                        <Route index element={<RegistrationPage />} />
                    </Route>
                    <Route path={Pages.NOT_FOUND} element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to={Pages.NOT_FOUND} />} />
                </>,
            ),
        )}
    />
);
