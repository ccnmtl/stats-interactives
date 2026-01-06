import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './scss/main.scss';

window.React = React;

const container = document.getElementById('graph-root');
const root = createRoot(container);
root.render(<App />);
