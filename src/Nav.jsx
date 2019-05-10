import React from 'react';
import {Link} from 'react-router-dom';

export const Nav = () => (
    <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
            <span className="stats">Stats</span>
            Interactives
            <span className="beta"> Beta</span>
        </Link>
        <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        &larr; Back to the Collection
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);
