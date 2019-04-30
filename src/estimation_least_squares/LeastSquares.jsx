import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';

import { RegressionForm } from './RegressionForm';
import { RegressionGraph } from './RegressionGraph';
import { ErrorGraph } from './ErrorGraph';
import { findLinearRegression, calculateSSE} from  '../utils';

var seedrandom = require('seedrandom');

const ERROR_GRAPH_X = 4;
const ERROR_GRAPH_Y = 10;
const ERROR_GRAPH_AREA = ERROR_GRAPH_X * ERROR_GRAPH_Y;

export class LeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSlope = this.handleSlope.bind(this);
        this.handleIntercept = this.handleIntercept.bind(this);
        this.getEstimatedSSEOpacity = this.getEstimatedSSEOpacity.bind(this);
        this.handleShowBestFit = this.handleShowBestFit.bind(this);
        this.generatePopulation = this.generatePopulation.bind(this);
        this.validatePopulation= this.validatePopulation.bind(this);
        this.reset = this.reset.bind(this);

        /* eslint-disable */
        // This guard condition is needed to pass tests, as the location
        // object isn't passed on render in the test suite
        let isAssessment = false;
        if (typeof(this.props.location) !== 'undefined'){
            isAssessment = this.props.location.pathname === '/least-squares-estimation-assessment';
        }
        /* eslint-enable */

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
            isAssessment: isAssessment,
        };

        this.state = this.initialState;
    }
    handleSeed(seed) {
        this.setState({
            seed: seed,
        });
    }
    generatePopulation() {
        let len = 6;
        let min = -5;
        let max = 5;

        let scale = max - min;
        let offset = min;
        return [...Array(len)].map(() => {
            return [(Math.random() * scale) + offset,
                (Math.random() * scale) + offset];
        });
    }
    validatePopulation(population, alpha, beta, optimalSSE) {
        // Population Constraints
        const minSSE = 3;
        const maxSSE = 15;
        const minSlope = -5;
        const maxSlope = 5;
        const minIntercept = -4;
        const maxIntercept = 4;

        if (minSlope <= beta && beta <= maxSlope &&
            minIntercept <= alpha && alpha <= maxIntercept &&
            minSSE <= optimalSSE && optimalSSE <= maxSSE) {
            return true;
        }
        return false;
    }
    handleGeneratePop() {
        let seed = this.state.isAssessment ?
            this.state.seed + 'IHeartStatistics' : this.state.seed;
        seedrandom(seed, {global: true});

        let population = [];
        let beta = null;
        let alpha = null;
        let optimalSSE = null;
        let bestFitFunc = null;

        /*eslint-disable-next-line no-constant-condition*/
        while (true) {
            population = this.generatePopulation();

            [beta, alpha] = findLinearRegression(population);
            bestFitFunc = (x) => {return beta * x + alpha;};
            optimalSSE = calculateSSE(population, bestFitFunc);

            // Rerun the loop until we get a population that
            // conforms to the required constraints.
            if (this.validatePopulation(
                population, alpha, beta, optimalSSE)) {
                break;
            }
        }


        let estimatedSSE = calculateSSE(
            population, this.state.regressionFunc);
        let errorSize = estimatedSSE / ERROR_GRAPH_X;

        this.setState({
            population: population,
            bestFitFunc: bestFitFunc,
            optimalSSE: optimalSSE,
            beta: beta,
            alpha: alpha,
            estimatedSSE: estimatedSSE,
            errorSize: errorSize,
            estimatedSSEOpacity: this.getEstimatedSSEOpacity(estimatedSSE),
            optimalSize: optimalSSE / ERROR_GRAPH_X,
        });
    }
    handleSlope(val) {
        let regressionFunc = (x) => {return val * x + this.state.intercept;};
        let estimatedSSE = calculateSSE(
            this.state.population, regressionFunc);
        let errorSize = estimatedSSE / ERROR_GRAPH_X;
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
        let estimatedSSE = calculateSSE(
            this.state.population, regressionFunc);
        let errorSize = estimatedSSE / ERROR_GRAPH_X;
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
                    <div className={'col-4'}>
                        <RegressionForm
                            seed={this.state.seed}
                            handleSeed={this.handleSeed}
                            handleGeneratePop={this.handleGeneratePop}
                            slope={this.state.slope}
                            intercept={this.state.intercept}
                            beta={this.state.beta}
                            alpha={this.state.alpha}
                            handleSlope={this.handleSlope}
                            handleIntercept={this.handleIntercept}
                            handleShowBestFit={this.handleShowBestFit}
                            showBestFit={this.state.showBestFit}
                            reset={this.reset}
                            isAssessment={this.state.isAssessment}
                            hasPopulation={
                                this.state.population ? true : false}/>
                    </div>
                    <div className={'col-8'}>
                        <div className={'ls-graph-container'}>
                            <div className={
                                'graph-contianer ls-regression-graph'}>
                                <h2>Samples and Regression Line</h2>
                                <RegressionGraph
                                    population={this.state.population}
                                    regressionFunc={this.state.regressionFunc}
                                    bestFitFunc={this.state.bestFitFunc}
                                    showBestFit={this.state.showBestFit}/>
                            </div>
                            <div className={'graph-container ls-error-graph'}>
                                <h2>Sum of Square Errors</h2>
                                <ErrorGraph
                                    optimalSize={this.state.optimalSize}
                                    errorSize={this.state.errorSize}
                                    showBestFit={this.state.showBestFit}
                                    estimatedSSE={this.state.estimatedSSE}
                                    optimalSSE={this.state.optimalSSE}
                                    estimatedSSEOpacity={
                                        this.state.estimatedSSEOpacity}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            </>
        );
    }
}
