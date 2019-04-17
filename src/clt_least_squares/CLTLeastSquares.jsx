import React, { Component } from 'react';
import { Nav } from '../Nav.jsx';
import { InputForm } from './InputForm';
import { PopulationGraph } from './PopulationGraph';
import { InterceptFrequencyGraph } from './InterceptFrequencyGraph';
import { SlopeFrequencyGraph } from './SlopeFrequencyGraph';
import { VarianceGraph } from './VarianceGraph';
import { findLinearRegression, createScatterPlotHistogram,
    unpackData} from  '../utils';

var seedrandom = require('seedrandom');
/* eslint-disable-next-line */
var jStat = require('jStat').jStat;

export const DOT_SIZE = 4;

const SAMPLE_SIZE = 100;
const NO_OF_SAMPLES = 100;
const MIN_BIN = 0;
const MAX_BIN = 1;
const NO_OF_BINS = 10;

export class CLTLeastSquares extends Component {
    constructor(props) {
        super(props);

        this.handleSeed = this.handleSeed.bind(this);
        this.handleBeta = this.handleBeta.bind(this);
        this.handleAlpha = this.handleAlpha.bind(this);
        this.handleStdDev = this.handleStdDev.bind(this);
        this.handleGeneratePop = this.handleGeneratePop.bind(this);
        this.handleSampleIdx = this.handleSampleIdx.bind(this);
        this.getPopulationRegression = this.
            getPopulationRegression.bind(this);
        this.getPopulationVariance = this.
            getPopulationVariance.bind(this);

        this.initialState = {
            seed: '',
            population: null,
            populationRegression: null,
            sampleIdx: 0,
            beta: 0,
            alpha: 0,
            stdDev: 0.1,
            slopeFreq: null,
            slopeFreqGraphData: null,
            interceptFreq: null,
            interceptFreqGraphData: null,
            varianceFreq: null,
            varianceFreqGraphData: null,
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
    handleStdDev(stdDev) {
        this.setState({
            stdDev: stdDev,
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
                let y = jStat.normal.sample(ySample, this.state.stdDev);
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
        let paramatizedSeed = this.state.seed +
            this.state.beta +
            this.state.alpha +
            this.state.stdDev;
        seedrandom(paramatizedSeed, {global: true});

        let population = this.generatePopulation();
        let populationRegression = this.getPopulationRegression(population);
        let slopeFreq = createScatterPlotHistogram(
            unpackData(populationRegression, 0),
            NO_OF_BINS,
            MIN_BIN,
            MAX_BIN
        );
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
            populationVariance,
            NO_OF_BINS,
            MIN_BIN,
            MAX_BIN
        );

        let varianceFreqGraphData = varianceFreq.slice(
            0, this.state.sampleIdx + 1);

        this.setState({
            population: population,
            populationRegression: populationRegression,
            slopeFreq: slopeFreq,
            interceptFreq: interceptFreq,
            slopeFreqGraphData: slopeFreqGraphData,
            interceptFreqGraphData: interceptFreqGraphData,
            varianceFreq: varianceFreq,
            varianceFreqGraphData: varianceFreqGraphData,
        });
    }
    render() {
        return (
            <>
            <Nav />
            <div className={'container'}>
                <h2>Central Limit - Least Squares</h2>
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
                            stdDev={this.state.stdDev}
                            handleStdDev={this.handleStdDev}
                            sampleIdx={this.state.sampleIdx}
                            handleSampleIdx={this.handleSampleIdx}
                            hasPopulation={
                                this.state.population ? true : false} />
                    </div>
                    <div className={'col-4'}>
                        <div>
                            <InterceptFrequencyGraph
                                samples={
                                    this.state.interceptFreqGraphData} />
                        </div>
                        <div>
                            <VarianceGraph
                                samples={this.state.varianceFreqGraphData} />
                        </div>
                    </div>
                    <div className={'col-4'}>
                        <div>
                            <PopulationGraph
                                population={this.state.population}
                                populationRegression={
                                    this.state.populationRegression}
                                sampleIdx={this.state.sampleIdx}/>
                        </div>
                        <div>
                            <SlopeFrequencyGraph
                                samples={this.state.slopeFreqGraphData} />
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}
