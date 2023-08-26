import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import './styles/common.scss';

import { AuthProvider } from '@providers/AuthProvider';
import { initializeAPI } from '@services/api';
import { App } from './App';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import('@axe-core/react').then(({ default: axe }) => {
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            axe(React, ReactDOM, 1000);
        }, 1000);
    });
}

const firebaseApp = initializeAPI();

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <AuthProvider firebaseApp={firebaseApp}>
            <Router basename="/">
                <App />
            </Router>
        </AuthProvider>
    </React.StrictMode>,
);
