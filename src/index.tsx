import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import './styles/common.scss';
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Router basename="/">
            <App />
        </Router>
    </React.StrictMode>,
);
