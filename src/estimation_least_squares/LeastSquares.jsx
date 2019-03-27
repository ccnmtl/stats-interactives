import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';

import { RegressionForm } from './RegressionForm';
import { RegressionGraph } from './RegressionGraph';
import { ErrorGraph } from './ErrorGraph';

var seedrandom = require('seedrandom');

// Threshold is a const that sets the size of the 'best fit' box
// in the error graph. It must be a number between 0 and 1.
const THRESHOLD = 0.2;

export class LeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSlope = this.handleSlope.bind(this);
        this.handleIntercept = this.handleIntercept.bind(this);
        this.findLinearRegression = this.findLinearRegression.bind(this);
        this.calculateSSE = this.calculateSSE.bind(this);
        this.calculateEstimatedSSESize = this.calculateEstimatedSSESize
            .bind(this);
        this.handleShowBestFit = this.handleShowBestFit.bind(this);
        this.reset = this.reset.bind(this);

        this.initialState = {
            seed: '',
            slope: 1,
            intercept: 0,
            regressionFunc: (x) => x,
            bestFitFunc: null,
            population: null,
            beta: null,
            alpha: null,
            showBestFit: false,
            estimatedSSE: null,
            optimalSSE: null,
            errorSize: null,
            optimalSize: THRESHOLD,
        };

        this.state = this.initialState;
    }
    handleSeed(seed) {
        this.setState({
            seed: seed,
        });
    }
    findLinearRegression(data) {
        // Per wikipedia:
        // https://en.wikipedia.org/wiki/Ordinary_least_squares#Simple_linear_regression_model
        let len = data.length;
        let sumXY = data.reduce((acc, val) => {
            acc += val[0] * val[1];
            return acc;
        }, 0);

        let sumX = data.reduce((acc, val) => {
            acc += val[0];
            return acc;
        }, 0);

        let sumY = data.reduce((acc, val) => {
            acc += val[1];
            return acc;
        }, 0);

        let powX = data.reduce((acc, val) => {
            acc += val[0] * val[0];
            return acc;
        }, 0);

        let beta = (
            (sumXY - (1/len * sumX * sumY)) / (powX - (1/len * sumX * sumX))
        );

        let alpha = (sumY / 6) - (beta * (sumX / 6));

        return [beta, alpha];
    }
    calculateSSE(data, func) {
        return data.reduce((acc, val) => {
            let squaredErr = Math.pow(val[1] - func(val[0]), 2);
            acc += squaredErr;
            return acc;
        }, 0);
    }
    calculateEstimatedSSESize(optSize, estimatedSSE) {
        // First calculate the relative size of the error box,
        // bounding it between 0 and 1
        let error = 1 - (1 / (1 + (estimatedSSE - this.state.optimalSSE)));
        // Use the relative size of the error as percentage of the space
        // between the optimal size of the box and 1
        let size = optSize + (error * (1 - optSize));
        return Number.isFinite(size) ? size : optSize;
    }
    handleGeneratePop() {
        seedrandom(this.state.seed, {global: true});

        let population = [...Array(6)].map(() => {
            let scale = 4;
            let offset = -2;
            return [(Math.random() * scale) + offset,
                (Math.random() * scale) + offset];
        });

        let [beta, alpha ] = this.findLinearRegression(population);
        let bestFitFunc = (x) => {return beta * x + alpha;};
        let optimalSSE = this.calculateSSE(population, bestFitFunc);

        let estimatedSSE = this.calculateSSE(
            population, this.state.regressionFunc);
        let errorSize = this.calculateEstimatedSSESize(THRESHOLD, estimatedSSE);

        this.setState({
            population: population,
            bestFitFunc: bestFitFunc,
            optimalSSE: optimalSSE,
            beta: beta,
            alpha: alpha,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
        });
    }
    handleSlope(val) {
        let regressionFunc = (x) => {return val * x + this.state.intercept;};
        let estimatedSSE = this.calculateSSE(
            this.state.population, regressionFunc);
        let errorSize = this.calculateEstimatedSSESize(THRESHOLD, estimatedSSE);
        this.setState({
            slope: val,
            regressionFunc: regressionFunc,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
        });
    }
    handleIntercept(val) {
        let regressionFunc = (x) => {return this.state.slope * x + val;};
        let estimatedSSE = this.calculateSSE(
            this.state.population, regressionFunc);
        let errorSize = this.calculateEstimatedSSESize(THRESHOLD, estimatedSSE);
        this.setState({
            intercept: val,
            regressionFunc: regressionFunc,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
        });
    }
    handleShowBestFit() {
        this.setState((prevState) => ({
            showBestFit: !prevState.showBestFit,
        }));
    }
    reset() {
        this.setState(this.initialState);
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
                            handleIntercept={this.handleIntercept}
                            handleShowBestFit={this.handleShowBestFit}
                            reset={this.reset}
                            hasPopulation={
                                this.state.population ? true : false}/>
                        {this.state.population &&
                        <ErrorGraph
                            optimalSize={this.state.optimalSize}
                            errorSize={this.state.errorSize}
                            showBestFit={this.state.showBestFit} />
                        }
                        {this.state.showBestFit &&
                            <p>beta: {this.state.beta},
                            alpha: {this.state.alpha}</p>
                        }
                    </div>
                    <div className={'col-8'}>
                        <div className={'graph-container'}>
                            <RegressionGraph
                                population={this.state.population}
                                regressionFunc={this.state.regressionFunc}
                                bestFitFunc={this.state.bestFitFunc}
                                showBestFit={this.state.showBestFit}/>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            </>
        );
    }
}
