import React from 'react';
import {Link} from 'react-router-dom';

export const Nav = () => (
    <>
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
    <div className={'container'}>
        <div className="alert alert-danger d-block d-xl-none view-only"
            role="alert" aria-hidden="true">
            Stats Interactives are optimized for larger screens. Please
            switch to a desktop computer, or expand your browser size.
        </div>
    </div>
    </>
);
