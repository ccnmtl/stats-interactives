import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Nav } from '../Nav.jsx';
import { InputForm } from './InputForm';
import { PopulationGraph } from './PopulationGraph';
import { InterceptFrequencyGraph } from './InterceptFrequencyGraph';
import { SlopeFrequencyGraph } from './SlopeFrequencyGraph';
import { VarianceGraph } from './VarianceGraph';
import { findLinearRegression, createScatterPlotHistogram,
    unpackData} from  '../utils';

var seedrandom = require('seedrandom');
var jStat = require('jStat').jStat;
import * as math from 'mathjs';

export const DOT_SIZE = 4;

const SAMPLE_SIZE = 100;
const NO_OF_SAMPLES = 100;

export const INTERCEPT_FREQ_MIN = -4;
export const INTERCEPT_FREQ_MAX = 4;
export const SLOPE_FREQ_MIN = -2.5;
export const SLOPE_FREQ_MAX = 2.5;
export const VARIANCE_FREQ_MIN = 0;
export const VARIANCE_FREQ_MAX = 3;

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
        this.handlePopulationReset = this.handlePopulationReset.bind(this);

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
            populationVariance: null,
            varianceFreq: null,
            varianceFreqGraphData: null,
            interceptCumalativeMean: [0],
            slopeCumalativeMean: [0],
            varianceCumalativeMean: [0],
        };

        this.state = this.initialState;
    }
    handleSeed(seed) {
        this.setState({
            seed: seed,
        });
    }
    handlePopulationReset() {
        this.setState({
            population: null,
            populationRegression: null,
            slopeFreq: null,
            interceptFreq: null,
            slopeFreqGraphData: null,
            interceptFreqGraphData: null,
            populationVariance: null,
            varianceFreq: null,
            varianceFreqGraphData: null,
            interceptCumalativeMean: [0],
            slopeCumalativeMean: [0],
            varianceCumalativeMean: [0],
        });
    }
    handleBeta(beta) {
        ReactGA.event({
            category: 'SamplingDistibutionRegression',
            action: 'Change Form Value',
            label: 'Beta',
            value: beta,
        });
        this.handlePopulationReset();
        this.setState({
            beta: beta,
        });
    }
    handleAlpha(alpha) {
        ReactGA.event({
            category: 'SamplingDistibutionRegression',
            action: 'Change Form Value',
            label: 'Alpha',
            value: alpha,
        });
        this.handlePopulationReset();
        this.setState({
            alpha: alpha,
        });
    }
    handleVariance(variance) {
        ReactGA.event({
            category: 'SamplingDistibutionRegression',
            action: 'Change Form Value',
            label: 'Variance',
            value: variance,
        });
        this.handlePopulationReset();
        this.setState({
            variance: variance,
        });
    }
    handleSampleIdx(idx) {
        let slopeFreqGraphData = this.state.slopeFreq.slice(0, idx + 1);
        let interceptFreqGraphData = this.state.interceptFreq.slice(0, idx + 1);
        let varianceFreqGraphData = this.state.varianceFreq.slice(0, idx + 1);

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
    handleGeneratePop() {
        ReactGA.event({
            category: 'SamplingDistibutionRegression',
            action: 'Generate Samples',
        });
        let paramatizedSeed = this.state.seed +
            this.state.beta +
            this.state.alpha +
            this.state.variance;
        seedrandom(paramatizedSeed, {global: true});

        let population = this.generatePopulation();
        let populationRegression = this.getPopulationRegression(population);
        let populationSlopes = unpackData(populationRegression, 0);
        let slopeFreq = createScatterPlotHistogram(
            populationSlopes,
            (SLOPE_FREQ_MAX - SLOPE_FREQ_MIN) * 10,
            SLOPE_FREQ_MIN,
            SLOPE_FREQ_MAX);
        let slopeFreqGraphData = slopeFreq.slice(0, this.state.sampleIdx + 1);
        let slopeCumalativeMean = populationSlopes.map((val, idx, arr) => {
            return math.round(
                math.mean(arr.slice(0, idx + 1)), 2);
        });

        let interceptFreqNoOfBins =
            (INTERCEPT_FREQ_MAX - INTERCEPT_FREQ_MIN) * 5;
        let interceptFreqMinBin = INTERCEPT_FREQ_MIN;
        let interceptFreqMaxBin = INTERCEPT_FREQ_MAX;
        let populationIntercepts = unpackData(populationRegression, 1);
        let interceptFreq = createScatterPlotHistogram(
            populationIntercepts,
            interceptFreqNoOfBins,
            interceptFreqMinBin,
            interceptFreqMaxBin
        );
        let interceptFreqGraphData = interceptFreq.slice(
            0, this.state.sampleIdx + 1);
        let interceptCumalativeMean = populationSlopes.map((val, idx, arr) => {
            return math.round(
                math.mean(arr.slice(0, idx + 1)), 2);
        });

        let populationVariance = this.getPopulationVariance(
            population, populationRegression);
        let varianceFreq = createScatterPlotHistogram(
            populationVariance,
            (VARIANCE_FREQ_MAX - VARIANCE_FREQ_MIN) * 10,
            VARIANCE_FREQ_MIN,
            VARIANCE_FREQ_MAX);

        let varianceFreqGraphData = varianceFreq.slice(
            0, this.state.sampleIdx + 1);
        let varianceCumalativeMean = populationVariance.map((val, idx, arr) => {
            return math.round(
                math.mean(arr.slice(0, idx + 1)), 2);
        });

        this.setState({
            population: population,
            populationRegression: populationRegression,
            slopeFreq: slopeFreq,
            interceptFreq: interceptFreq,
            slopeFreqGraphData: slopeFreqGraphData,
            interceptFreqGraphData: interceptFreqGraphData,
            populationVariance: populationVariance,
            varianceFreq: varianceFreq,
            varianceFreqGraphData: varianceFreqGraphData,
            interceptCumalativeMean: interceptCumalativeMean,
            slopeCumalativeMean: slopeCumalativeMean,
            varianceCumalativeMean: varianceCumalativeMean,
        });
    }
    render() {
        return (
            <>
            <Nav />
            <main className={'container'}>
                <h1>Sampling Distribution of Regression Coefficients</h1>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <p>Enter text in the seed field to start the
                            simulation. Choose the parameters of the
                            regression model. Each sample shown in the top
                            right graph comes from a distribution with the
                            parameters you selected. Use the sample slider to
                            move through the samples and visualize how the
                            prediction line changes with each sample. The other
                            three graphs depict a histogram of the prediction
                            line intercept, slope, and of the mean sum of
                            squared residuals.
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
                            populationVariance={this.state.populationVariance}/>
                    </div>
                    <div className={'col-4'}>
                        <div className={'cls-graph-container'}>
                            <h2>Sampling Distribution Intercept</h2>
                            <div>
                                <InterceptFrequencyGraph
                                    samples={
                                        this.state.interceptFreqGraphData}
                                    interceptCumalativeMean={
                                        this.state.interceptCumalativeMean[
                                            this.state.sampleIdx]}/>
                            </div>
                        </div>
                        <div className={'cls-graph-container'}>
                            <h2>Sampling Distribution MSE</h2>
                            <div>
                                <VarianceGraph
                                    samples={
                                        this.state.varianceFreqGraphData}
                                    varianceCumalativeMean={
                                        this.state.varianceCumalativeMean[
                                            this.state.sampleIdx]}/>
                            </div>
                        </div>
                    </div>
                    <div className={'col-4'}>
                        <div className={`cls-graph-container
                            cls-population-graph-container`}>
                            <div className={'cls-arrow cls-arrow-left'}>
                                <div className={'arrow-point'}></div>
                                <div className={'arrow-shaft'}></div>
                            </div>
                            <div className={'cls-arrow cls-arrow-bottom-left'}>
                                <div className={'arrow-point'}></div>
                                <div className={'arrow-shaft'}></div>
                            </div>
                            <div className={'cls-arrow cls-arrow-bottom'}>
                                <div className={'arrow-point'}></div>
                                <div className={'arrow-shaft'}></div>
                            </div>
                            <h2>Sample Data</h2>
                            <div>
                                <PopulationGraph
                                    population={this.state.population}
                                    populationRegression={
                                        this.state.populationRegression}
                                    slope={this.state.beta}
                                    intercept={this.state.alpha}
                                    sampleIdx={this.state.sampleIdx}/>
                            </div>
                        </div>
                        <div className={'cls-graph-container'}>
                            <h2>Sampling Distribution Slope</h2>
                            <div>
                                <SlopeFrequencyGraph
                                    samples={this.state.slopeFreqGraphData}
                                    slopeCumalativeMean={
                                        this.state.slopeCumalativeMean[
                                            this.state.sampleIdx]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <hr/>
            </>
        );
    }
}
