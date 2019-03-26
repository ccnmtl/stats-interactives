import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';

import { RegressionForm } from './RegressionForm';
import { RegressionGraph } from './RegressionGraph';

var seedrandom = require('seedrandom');

export class LeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSlope = this.handleSlope.bind(this);
        this.handleIntercept = this.handleIntercept.bind(this);

        this.initialState = {
            seed: '',
            slope: 1,
            intercept: 0,
            regressionFunc: (x) => x,
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
        seedrandom(this.state.seed, {global: true});

        let population = [...Array(6)].map(() => {
            let scale = 4;
            let offset = -2;
            return [(Math.random() * scale) + offset,
                (Math.random() * scale) + offset];
        });
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
                        <div className={'graph-container'}>
                            <RegressionGraph
                                population={this.state.population}
                                regressionFunc={this.state.regressionFunc}/>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            </>
        );
    }
}
