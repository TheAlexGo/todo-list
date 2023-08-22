import React, { FC, JSX } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@providers/AuthProvider';
import { Loader, LoaderSizes } from '@components/Loader/Loader';
import { Pages } from '@types';

export const ProtectedLayout: FC = (): JSX.Element => {
    const location = useLocation();
    const { isAuthenticate } = useAuth();

    if (isAuthenticate === null) {
        return <Loader size={LoaderSizes.XL} isFixedOnCenter />;
    }

    if (!isAuthenticate) {
        return <Navigate to={Pages.LOGIN} state={{ from: location }} />;
    }

    return <Outlet />;
};
