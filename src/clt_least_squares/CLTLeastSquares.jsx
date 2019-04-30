import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';
import { InputForm } from './InputForm';
import { PopulationGraph } from './PopulationGraph';
import { InterceptFrequencyGraph } from './InterceptFrequencyGraph';
import { SlopeFrequencyGraph } from './SlopeFrequencyGraph';
import { VarianceGraph } from './VarianceGraph';
import { findLinearRegression, createScatterPlotHistogram,
    unpackData, calculateSSE} from  '../utils';

var seedrandom = require('seedrandom');
var jStat = require('jStat').jStat;

export const DOT_SIZE = 4;

const SAMPLE_SIZE = 100;
const NO_OF_SAMPLES = 100;

export class CLTLeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleBeta = this.handleBeta.bind(this);
        this.handleAlpha = this.handleAlpha.bind(this);
        this.handleVariance = this.handleVariance.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSampleIdx = this.handleSampleIdx.bind(this);
        this.getPopulationRegression = this.
            getPopulationRegression.bind(this);
        this.getPopulationVariance = this.
            getPopulationVariance.bind(this);
        this.getPopulationSSE= this.getPopulationSSE.bind(this);

        this.initialState = {
            seed: '',
            population: null,
            populationRegression: null,
            sampleIdx: 0,
            beta: 0,
            alpha: 0,
            variance: 0.5,
            slopeFreq: null,
            slopeFreqGraphData: null,
            interceptFreq: null,
            interceptFreqGraphData: null,
            varianceFreq: null,
            varianceFreqGraphData: null,
            populationSSE: null,
        };

        this.state = this.initialState;
    }
    handleSeed(seed) {
        this.setState({
            seed: seed,
        });
    }
    handleBeta(beta) {
        this.setState({
            beta: beta,
        });
    }
    handleAlpha(alpha) {
        this.setState({
            alpha: alpha,
        });
    }
    handleVariance(variance) {
        this.setState({
            variance: variance,
        });
    }
    handleSampleIdx(idx) {
        let slopeFreqGraphData = this.state.slopeFreq.slice(
            0, this.state.sampleIdx + 1);
        let interceptFreqGraphData = this.state.interceptFreq.slice(
            0, this.state.sampleIdx + 1);
        let varianceFreqGraphData = this.state.varianceFreq.slice(
            0, this.state.sampleIdx + 1);

        this.setState({
            sampleIdx: idx,
            slopeFreqGraphData: slopeFreqGraphData,
            interceptFreqGraphData: interceptFreqGraphData,
            varianceFreqGraphData: varianceFreqGraphData,
        });
    }
    generatePopulation() {
        return [...Array(NO_OF_SAMPLES)].map((val) => {
            return [...Array(SAMPLE_SIZE)].map((val) => {
                let x = Math.random();
                let ySample = this.state.beta * x + this.state.alpha;
                let stdDev = Math.sqrt(this.state.variance);
                let y = jStat.normal.sample(ySample, stdDev);
                return [x, y];
            });
        });
    }
    getPopulationRegression(pop) {
        return pop.map((val) => {
            return findLinearRegression(val);
        });
    }
    getPopulationVariance(population, populationRegression) {
        return population.map((val, i) => {
            let residuals = val.map((el) => {
                let slope = populationRegression[i][0];
                let intercept = populationRegression[i][1];
                let y_hat = slope * el[0] + intercept;
                return el[1] - y_hat;
            });
            return jStat.variance(residuals) * (99 / 98);
        });
    }
    getPopulationSSE(population, populationRegression) {
        return population.map((val, i) => {
            let slope = populationRegression[i][0];
            let intercept = populationRegression[i][1];
            let bestFitFunc = (x) => slope * x + intercept;
            return calculateSSE(val, bestFitFunc);
        });
    }
    handleGeneratePop() {
        let paramatizedSeed = this.state.seed +
            this.state.beta +
            this.state.alpha +
            this.state.variance;
        seedrandom(paramatizedSeed, {global: true});

        let population = this.generatePopulation();
        let populationRegression = this.getPopulationRegression(population);
        let slopeFreq = createScatterPlotHistogram(
            unpackData(populationRegression, 0), 40, -2, 2);
        let slopeFreqGraphData = slopeFreq.slice(0, this.state.sampleIdx + 1);

        let interceptFreqNoOfBins = 30;
        let interceptFreqMinBin = -3;
        let interceptFreqMaxBin = 3;
        let interceptFreq = createScatterPlotHistogram(
            unpackData(populationRegression, 1),
            interceptFreqNoOfBins,
            interceptFreqMinBin,
            interceptFreqMaxBin
        );
        let interceptFreqGraphData = interceptFreq.slice(
            0, this.state.sampleIdx + 1);

        let populationVariance = this.getPopulationVariance(
            population, populationRegression);
        let varianceFreq = createScatterPlotHistogram(
            populationVariance, 20, 0, 2);

        let varianceFreqGraphData = varianceFreq.slice(
            0, this.state.sampleIdx + 1);

        let populationSSE = this.getPopulationSSE(
            population, populationRegression);

        this.setState({
            population: population,
            populationRegression: populationRegression,
            slopeFreq: slopeFreq,
            interceptFreq: interceptFreq,
            slopeFreqGraphData: slopeFreqGraphData,
            interceptFreqGraphData: interceptFreqGraphData,
            varianceFreq: varianceFreq,
            varianceFreqGraphData: varianceFreqGraphData,
            populationSSE: populationSSE,
        });
    }
    render() {
        return (
            <>
            <Nav />
            <div className={'container'}>
                <h2>Sampling Distribution of Regression Coefficients</h2>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <p>Elit explicabo rerum ea distinctio nesciunt a velit
                            optio quod officiis. Perspiciatis animi nobis et
                            ab saepe Nam amet ullam ullam eum dolore facilis
                            consequatur maiores Sed necessitatibus nobis est.
                        </p>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-4'}>
                        <InputForm
                            seed={this.state.seed}
                            handleSeed={this.handleSeed}
                            handleGeneratePop={this.handleGeneratePop}
                            beta={this.state.beta}
                            handleBeta={this.handleBeta}
                            alpha={this.state.alpha}
                            handleAlpha={this.handleAlpha}
                            variance={this.state.variance}
                            handleVariance={this.handleVariance}
                            sampleIdx={this.state.sampleIdx}
                            handleSampleIdx={this.handleSampleIdx}
                            hasPopulation={
                                this.state.population ? true : false}
                            populationRegression={
                                this.state.populationRegression}
                            populationSSE={this.state.populationSSE}/>
                    </div>
                    <div className={'col-4'}>
                        <div className={'cls-graph-container'}>
                            <h3>Sampling Distribution Intercept</h3>
                            <div>
                                <InterceptFrequencyGraph
                                    samples={
                                        this.state.interceptFreqGraphData} />
                            </div>
                        </div>
                        <div className={'cls-graph-container'}>
                            <h3>Sampling Distribution MSE</h3>
                            <div>
                                <VarianceGraph
                                    samples={
                                        this.state.varianceFreqGraphData} />
                            </div>
                        </div>
                    </div>
                    <div className={'col-4'}>
                        <div className={'cls-graph-container'}>
                            <h3>Sample Data</h3>
                            <div>
                                <PopulationGraph
                                    population={this.state.population}
                                    populationRegression={
                                        this.state.populationRegression}
                                    sampleIdx={this.state.sampleIdx}/>
                            </div>
                        </div>
                        <div className={'cls-graph-container'}>
                            <h3>Sampling Distribution Slope</h3>
                            <div>
                                <SlopeFrequencyGraph
                                    samples={this.state.slopeFreqGraphData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            </>
        );
    }
}
