import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';

export class OrdinaryLeastSquares extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <h2>Ordinary Least Squares</h2>
            </div>
            </>
        );
    }
}
