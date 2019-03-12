import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';

import { RegressionForm } from './RegressionForm';

export class LeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSlope = this.handleSlope.bind(this);
        this.handleIntercept = this.handleIntercept.bind(this);

        this.initialState = {
            seed: '',
            slope: 0,
            intercept: 0,
            regressionFunc: null,
            population: null,
        };

        this.state = this.initialState;
    }
    handleSeed(seed) {
        this.setState({
            seed: seed,
        });
    }
    handleGeneratePop() {
        let population = null;

        this.setState({
            population: population,
        });
    }
    handleSlope(val) {
        this.setState((state, props) => ({
            slope: val,
            regressionFunc: (x) => {return val * x + state.intercept;}
        }));
    }
    handleIntercept(val) {
        this.setState((state, props) => ({
            intercept: val,
            regressionFunc: (x) => {return state.slope * x + val;}
        }));
    }
    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <h2>Estimation of Least Squares</h2>
                <div className={'row'}>
                    <div className={'col-4'}>
                        <RegressionForm
                            seed={this.state.seed}
                            handleSeed={this.handleSeed}
                            handleGeneratePop={this.handleGeneratePop}
                            slope={this.state.slope}
                            intercept={this.state.intercept}
                            handleSlope={this.handleSlope}
                            handleIntercept={this.handleIntercept}/>
                    </div>
                    <div className={'col-8'}>
                    </div>
                </div>
            </div>
            <hr />
            </>
        );
    }
}
