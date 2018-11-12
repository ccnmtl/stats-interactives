import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './scss/main.scss'

window.React = React;

ReactDOM.render(<App />, document.getElementById('graph-root'));
