import React, { Component } from 'react';
import * as math from 'mathjs';
import ReactGA from 'react-ga';
import {
    createHistogramArray, getHistogramMaxima,
    createScatterPlotHistogram } from '../utils.js';
import { Nav } from '../Nav';
import { PopulationGraph } from './PopulationGraph';
import { SampleMeansGraph } from './SampleMeansGraph';
import { PopulationForm } from './PopulationForm';
import { SampleForm } from './SampleForm';
import { SampleRangeSlider } from './SampleRangeSlider';
import { normalBarHeight, exponentialBarHeight } from './populations';

var seedrandom = require('seedrandom');
var jStat = require('jStat').jStat;

export const MIN_BIN = -18;
export const MAX_BIN = 18;
export const NO_OF_BINS = MAX_BIN - MIN_BIN;

export const DISTRIBUTION_TYPE = [
    {
        value: 'normal',
        display: 'Normal',
    },
    {
        value: 'skew_right',
        display: 'Skew Right',
    },
];

export class CentralLimitGraph extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.generatePopulation = this.generatePopulation.bind(this);
        this.handleGeneratePopulation = this.handleGeneratePopulation
            .bind(this);
        this.handleResetPopulation = this.handleResetPopulation.bind(this);
        this.runSample = this.runSample.bind(this);
        this.handleSampleMeansIdx = this.handleSampleMeansIdx.bind(this);
        this.handleObservationIdx = this.handleObservationIdx.bind(this);
        this.handleResetSamples = this.handleResetSamples.bind(this);
        this.handleResetSimulation = this.handleResetSimulation.bind(this);

        let distType = 'skew_right';

        const populationSize = 10000;
        const mean = 0;
        const stdDev = 1;

        const defaultSampleSize = 25;
        const defaultNumberOfSamples = 100;

        this.state = {
            seed: '',
            populationSize: populationSize,
            population: null,
            populationGraphData: null,
            mean: mean,
            stdDev: stdDev,
            distType: distType,
            // sampleSize is the number of observations within each sample
            sampleSize: defaultSampleSize,
            // number of samples is the overall samples taken of a population
            numberOfSamples: defaultNumberOfSamples,
            samples: null,
            samplesIdx: 1,
            samplesGraphData: null,
            sampleMeans: null,
            sampleMeansIdx: null,
            sampleMeansGraphData: null,
            domain: [-6, 6],
            sampleMeansDomain: null,
            sampleMeansRange: [0, 1],
            meanOfSampleMeans: null,
            observationIdx: null,
            observationData: null,
            activeSampleMeansData: null,
        };
    }
    handleChange(key, value) {
        if (key !== 'seed') {
            ReactGA.event({
                category: 'User',
                action: 'Upate population params',
                label: key,
                value: value,
            });
        }
        this.setState({
            [key]: value
        });
    }
    handleGeneratePopulation() {
        ReactGA.event({
            category: 'User',
            action: 'Generate Population'
        });
        let mean = this.state.mean;
        let stdDev = this.state.stdDev;

        let population = this.generatePopulation();
        let populationGraphData = [];

        let graphDomain = math.range(MIN_BIN, MAX_BIN, true);
        switch(this.state.distType){
        case 'normal':
            populationGraphData = normalBarHeight(graphDomain, mean, stdDev)
                .map((val, idx) => {return [graphDomain[idx], val];});
            break;
        case 'skew_right':
            populationGraphData =
                exponentialBarHeight(graphDomain, mean, stdDev)
                    .map((val, idx) => {return [graphDomain[idx], val];});
            break;
        default:
            populationGraphData = normalBarHeight(graphDomain, mean, stdDev)
                .map((val, idx) => {return [idx, val];});
            break;
        }

        this.setState({
            population: population,
            populationGraphData: populationGraphData,
            domain: [Math.min(...population), Math.max(...population)]
        });
    }
    handleResetPopulation() {
        this.setState({
            population: null,
            populationGraphData: null,
            domain: null
        });
    }
    generatePopulation() {
        this.handleResetSamples();
        let size = this.state.populationSize;
        let mean = this.state.mean;
        let stdDev = this.state.stdDev;
        let distType = this.state.distType;
        let seed = this.state.seed;
        let rate = 1 / stdDev;

        // Parametize the seed, so different populations are generated with
        // different parameters
        let saltedSeed = seed + size + mean + stdDev + distType;

        // Reset the global Math.random everytime this is called
        seedrandom(saltedSeed, {global: true});

        switch (distType) {
        case 'normal':
            return [...Array(size)].map((e) => {
                return math.round(jStat.normal.sample(mean, stdDev), 3);
            });

        case 'skew_right':
            return [...Array(size)].map((e) => {
                return math.round(
                    jStat.exponential.sample(rate) - stdDev + mean, 3);
            });
        default:
            // return a normal distribution
            return [...Array(size)].map((e) => {
                return math.round(jStat.normal.sample(mean, stdDev), 3);
            });
        }

    }
    runSample() {
        ReactGA.event({
            category: 'User',
            action: 'Run Sample'
        });
        this.handleResetSamples();
        // Use the base64 encoding of the seed as a simple hash
        let size = this.state.populationSize;
        let mean = this.state.mean;
        let stdDev = this.state.stdDev;
        let distType = this.state.distType;
        let seed = this.state.seed;

        let saltedSeed = seed + size + mean + stdDev + distType;

        let samplingSeed = window.btoa(saltedSeed);
        let ng = seedrandom(samplingSeed);

        // take samples from population values
        // - one sample consists of N sampleSize, which are then averaged
        // - N numberOfSamples are taken
        // push these to sampleSet
        // get the histogram and set state, render a line graph
        let samples = [...Array(this.state.numberOfSamples)].map((e) => {
            return [...Array(this.state.sampleSize)].map((e) => {
                let idx = Math.floor(ng() * this.state.population.length);
                return this.state.population[idx];
            });
        });

        let sampleMeans = samples.reduce((acc, e) => {
            acc.push(
                math.round(jStat.mean(e), 3)
            );
            return acc;
        }, []);

        let meanOfSampleMeans = math.round(jStat.mean(sampleMeans), 3);

        let samplesGraphData = createScatterPlotHistogram(
            samples[0], NO_OF_BINS, MIN_BIN, MAX_BIN);

        let sampleMeansGraphData = createScatterPlotHistogram(
            sampleMeans.slice(0, 1),
            NO_OF_BINS * 4,
            MIN_BIN,
            MAX_BIN);

        let samplesMaxFrequency = 0;
        samples.map((e) => {
            let max = getHistogramMaxima(createScatterPlotHistogram(
                e, NO_OF_BINS, MIN_BIN, MAX_BIN));
            if (max > samplesMaxFrequency) {
                samplesMaxFrequency = max;
            }
        });

        this.setState({
            samples: samples,
            sampleMeans: sampleMeans,
            sampleMeansDomain: [
                Math.min(...sampleMeans),
                Math.max(...sampleMeans)
            ],
            sampleMeansRange: [
                0,
                getHistogramMaxima(createHistogramArray(
                    sampleMeans,
                    NO_OF_BINS,
                    MIN_BIN,
                    MAX_BIN
                ))
            ],
            sampleMeansIdx: 1,
            samplesGraphData: samplesGraphData,
            sampleMeansGraphData: sampleMeansGraphData,
            samplesMax: samplesMaxFrequency,
            meanOfSampleMeans: meanOfSampleMeans,
            observationIdx: 1,
            observationData: [samplesGraphData[0]],
        });
    }
    handleSampleMeansIdx(idx) {
        let currentSampleMeans = this.state.sampleMeans.slice(0, idx);
        let currentSampleMeansData = createScatterPlotHistogram(
            currentSampleMeans,
            NO_OF_BINS * 4,
            MIN_BIN,
            MAX_BIN);
        let samplesGraphData = createScatterPlotHistogram(
            this.state.samples[idx - 1],
            NO_OF_BINS,
            MIN_BIN,
            MAX_BIN);

        // This is the sample means currently highlighted
        let lastSampleMeans= currentSampleMeansData.pop();
        let activeSampleMeansData = [{
            x: lastSampleMeans[0],
            y: lastSampleMeans[1],
            datum: lastSampleMeans[2],
        }];

        this.setState({
            sampleMeansIdx: idx,
            sampleMeansGraphData: currentSampleMeansData,
            samplesGraphData: samplesGraphData,
            observationData: [samplesGraphData[this.state.observationIdx -1]],
            activeSampleMeansData: activeSampleMeansData,
        });
    }
    handleObservationIdx(idx) {
        this.setState({
            observationIdx: idx,
            observationData: [this.state.samplesGraphData[idx - 1]]
        });
    }
    handleResetSamples() {
        this.setState({
            samples: null,
            sampleMeans: null,
            sampleMeansRange: null,
            sampleMeansIdx: null,
            samplesGraphData: null,
            sampleMeansGraphData: null,
            meanOfSampleMeans: null,
            observationIdx: null,
            observationData: null,
            activeSampleMeansData: null,
        });
    }
    handleResetSimulation() {
        ReactGA.event({
            category: 'User',
            action: 'Reset Simulation'
        });
        this.handleResetSamples();
        this.handleResetPopulation();
    }
    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <h2>The Central Limit Theorem</h2>
                <div className='row'>
                    <div className='col-4'>
                        <PopulationForm seed={this.state.seed}
                            populationSize={this.state.populationSize}
                            mean={this.state.mean}
                            stdDev={this.state.stdDev}
                            distType={this.state.distType}
                            sampleSize={this.state.sampleSize}
                            handleGeneratePopulation={
                                this.handleGeneratePopulation}
                            handleChange={this.handleChange}
                            showPopBtn={this.state.populationGraphData ?
                                false : true}/>
                        <SampleForm
                            sampleSize={this.state.sampleSize}
                            numberOfSamples={this.state.numberOfSamples}
                            handleChange={this.handleChange}
                            runSample={this.runSample}
                            sampleMeansIdx={this.state.sampleMeansIdx}
                            handleSampleMeansIdx={
                                this.handleSampleMeansIdx}
                            showSampleBtn={
                                this.state.populationGraphData ?
                                    false : true}/>
                        <SampleRangeSlider
                            numberOfSamples={this.state.numberOfSamples}
                            sampleMeansIdx={this.state.sampleMeansIdx}
                            handleSampleMeansIdx={
                                this.handleSampleMeansIdx}
                            sampleSize={this.state.sampleSize}
                            observationIdx={this.state.observationIdx}
                            observationData={this.state.observationData}
                            activeSampleMean={
                                this.state.activeSampleMeansData ?
                                    this.state.activeSampleMeansData[0]['datum']
                                    : 0}
                            handleObservationIdx={this.handleObservationIdx}
                            handleResetSamples={
                                this.handleResetSamples}/>
                    </div>
                    <div className='col-8 graph-col'>
                        <div className="graph-container sticky-top">
                            <h4>
                                Population and Current Sample</h4>
                            <PopulationGraph
                                populationGraphData={
                                    this.state.populationGraphData}
                                samplesGraphData={
                                    this.state.samplesGraphData}
                                samplesMax={this.state.samplesMax}
                                observationIdx={this.state.observationIdx}
                                observationData={this.state.observationData}
                                domain={this.state.domain}
                                sampleMean={this.state.sampleMeans ?
                                    this.state.sampleMeans[
                                        this.state.sampleMeansIdx] : null}/>
                            <h4>Distribution of Sample Means</h4>
                            {this.state.meanOfSampleMeans &&
                                <p>Mean of {this.state.numberOfSamples} Sample
                                    Means: {this.state.meanOfSampleMeans}</p>}
                            <SampleMeansGraph
                                domain={this.state.domain}
                                range={
                                    this.state.sampleMeansRange}
                                sampleMeansGraphData={
                                    this.state
                                        .sampleMeansGraphData}
                                popMean={this.state.mean}
                                activeSampleMeansData={
                                    this.state.activeSampleMeansData}/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="text-center">
                    <button type="button"
                        className="btn btn-danger"
                        id='reset-simulation'
                        onClick={this.handleResetSimulation}>
                        Reset Simulation
                    </button>
                </div>
            </div>
            <hr/>
            </>
        );
    }
}
