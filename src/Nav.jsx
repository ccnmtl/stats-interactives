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
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span> </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
    </nav>
);
