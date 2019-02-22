import React from 'react';
import { Nav } from './Nav';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <>
        <Nav />
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Error 404 - Page not Found</h2>
                    <p>
                        This page can not be found. Head back to
                        our <Link to={'/'}>home page</Link> to see
                        more interactives.
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};
