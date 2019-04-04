import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';

import { RegressionForm } from './RegressionForm';
import { RegressionGraph } from './RegressionGraph';
import { ErrorGraph } from './ErrorGraph';

var seedrandom = require('seedrandom');

const ERROR_GRAPH_X = 10;
const ERROR_GRAPH_Y = 4;
const ERROR_GRAPH_AREA = ERROR_GRAPH_X * ERROR_GRAPH_Y;

export class LeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSlope = this.handleSlope.bind(this);
        this.handleIntercept = this.handleIntercept.bind(this);
        this.findLinearRegression = this.findLinearRegression.bind(this);
        this.calculateSSE = this.calculateSSE.bind(this);
        this.getEstimatedSSEOpacity = this.getEstimatedSSEOpacity.bind(this);
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
            estimatedSSEOpacity: null,
            optimalSSE: null,
            errorSize: null,
            optimalSize: null,
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
    handleGeneratePop() {
        seedrandom(this.state.seed, {global: true});

        const minSSE = 3;
        const maxSSE = 15;
        const minSlope = -5;
        const maxSlope = 5;
        const minIntercept = -4;
        const maxIntercept = 4;

        let population = [];
        let beta = null;
        let alpha = null;
        let optimalSSE = null;
        let bestFitFunc = null;

        let popNotFound = true;
        while (popNotFound) {
            population = [...Array(6)].map(() => {
                let scale = 10;
                let offset = -5;
                return [(Math.random() * scale) + offset,
                    (Math.random() * scale) + offset];
            });

            [beta, alpha] = this.findLinearRegression(population);
            bestFitFunc = (x) => {return beta * x + alpha;};
            optimalSSE = this.calculateSSE(population, bestFitFunc);

            if (minSlope <= beta && beta <= maxSlope &&
                minIntercept <= alpha && alpha <= maxIntercept &&
                minSSE <= optimalSSE && optimalSSE <= maxSSE) {
                popNotFound = false;
            }
        }


        let estimatedSSE = this.calculateSSE(
            population, this.state.regressionFunc);
        let errorSize = estimatedSSE / ERROR_GRAPH_Y;

        this.setState({
            population: population,
            bestFitFunc: bestFitFunc,
            optimalSSE: optimalSSE,
            beta: beta,
            alpha: alpha,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
            estimatedSSEOpacity: this.getEstimatedSSEOpacity(estimatedSSE),
            optimalSize: optimalSSE / ERROR_GRAPH_Y,
        });
    }
    handleSlope(val) {
        let regressionFunc = (x) => {return val * x + this.state.intercept;};
        let estimatedSSE = this.calculateSSE(
            this.state.population, regressionFunc);
        let errorSize = estimatedSSE / ERROR_GRAPH_Y;
        this.setState({
            slope: val,
            regressionFunc: regressionFunc,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
            estimatedSSEOpacity: this.getEstimatedSSEOpacity(estimatedSSE),
        });
    }
    handleIntercept(val) {
        let regressionFunc = (x) => {return this.state.slope * x + val;};
        let estimatedSSE = this.calculateSSE(
            this.state.population, regressionFunc);
        let errorSize = estimatedSSE / ERROR_GRAPH_Y;
        this.setState({
            intercept: val,
            regressionFunc: regressionFunc,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
            estimatedSSEOpacity: this.getEstimatedSSEOpacity(estimatedSSE),
        });
    }
    handleShowBestFit() {
        this.setState((prevState) => ({
            showBestFit: !prevState.showBestFit,
        }));
    }
    getEstimatedSSEOpacity(estimatedSSE) {
        return estimatedSSE > ERROR_GRAPH_AREA ? 1 : 0.5;
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
                    <div className={'col-6'}>
                        <RegressionForm
                            seed={this.state.seed}
                            handleSeed={this.handleSeed}
                            handleGeneratePop={this.handleGeneratePop}
                            slope={this.state.slope}
                            intercept={this.state.intercept}
                            beta={this.state.beta}
                            alpha={this.state.alpha}
                            estimatedSSE={this.state.estimatedSSE}
                            optimalSSE={this.state.optimalSSE}
                            handleSlope={this.handleSlope}
                            handleIntercept={this.handleIntercept}
                            handleShowBestFit={this.handleShowBestFit}
                            showBestFit={this.state.showBestFit}
                            reset={this.reset}
                            hasPopulation={
                                this.state.population ? true : false}/>
                    </div>
                    <div className={'col-6'}>
                        <div className={'graph-container'}>
                            {this.state.population &&
                            <ErrorGraph
                                optimalSize={this.state.optimalSize}
                                errorSize={this.state.errorSize}
                                showBestFit={this.state.showBestFit}
                                estimatedSSEOpacity={
                                    this.state.estimatedSSEOpacity}/>
                            }
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
