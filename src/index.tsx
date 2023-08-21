import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import './styles/common.scss';

import { AuthProvider } from '@providers/AuthProvider';
import { initializeAPI } from '@services/api';
import { App } from './App';

const firebaseApp = initializeAPI();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <AuthProvider firebaseApp={firebaseApp}>
            <Router basename="/">
                <App />
            </Router>
        </AuthProvider>
    </React.StrictMode>,
);
