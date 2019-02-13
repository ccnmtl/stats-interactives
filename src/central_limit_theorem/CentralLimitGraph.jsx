import React, { Component } from 'react';
import * as math from 'mathjs';
import {
    createHistogramArray, getHistogramMaxima,
    createScatterPlotHistogram } from '../utils.js';
import { Nav } from '../Nav.jsx';
import { PopulationGraph } from './PopulationGraph';
import { SampleMeansGraph } from './SampleMeansGraph';
import { PopulationForm } from './PopulationForm';
import { SampleForm } from './SampleForm';
import { SampleRangeSlider } from './SampleRangeSlider';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        value: 'skew_left',
        display: 'Skew Left',
    },
    {
        value: 'skew_right',
        display: 'Skew Right',
    },
    {
        value: 'bimodal',
        display: 'Bimodal'
    },
    {
        value: 'uniform',
        display: 'Uniform',
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

        let params = new URLSearchParams(location.search);
        let seed = '';
        if (!params.has('seed')) {
            // generate a seed
            seed = String(Date.now());
            params.set('seed', seed);
            window.history.replaceState(null, '', '?' + params.toString());
        } else {
            seed = String(params.get('seed'));
        }

        let distType = '';
        if (!params.has('distType')) {
            distType = 'skew_left';
            params.set('distType', 'skew_left');
            window.history.replaceState(null, '', '?' + params.toString());
        } else {
            // Validate that a dist type is on the list, else
            // set it to 'skew_left'
            let dt = params.get('distType');
            let found = DISTRIBUTION_TYPE.find(
                (e) => {return dt === e.value;});
            distType = found ? dt : 'skew_left';
            if (!found) {
                params.set('distType', 'skew_left');
                window.history.replaceState(null, '', '?' + params.toString());
            }
        }

        const populationSize = 100000;
        const mean = 0;
        const stdDev = 1;

        const defaultSampleSize = 50;
        const defaultNumberOfSamples = 1000;

        this.state = {
            seed: seed,
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
            observationIdx: null,
            observationData: null,
        };
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }
    handleGeneratePopulation() {
        let population = this.generatePopulation();
        let populationGraphData = createHistogramArray(
            population,
            NO_OF_BINS,
            MIN_BIN,
            MAX_BIN
        );
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

        // Reset the global Math.random everytime this is called
        seedrandom(seed, {global: true});

        switch (distType) {
        case 'normal':
            // This method munges the normal distribution such that every
            // value generated that is less than the mean is reflected about
            // the mean to produce a symetrical distribution.

            // Generate the first half of a normal distribution
            return [...Array(Math.floor(size / 2))].map((e) => {
                let s = null;
                do {
                    s = math.round(jStat.normal.sample(mean, stdDev), 1);
                } while (s > mean);
                return s;
            }).reduce((acc, e) => {
                // Then push the element on the accumulated array
                acc.push(e);
                if (e < mean) {
                    // If e is less than the mean, then find its reflection
                    // and push that to the array.
                    let diff = math.round(mean - e, 1);
                    acc.push(math.round(mean + diff, 1));
                }
                return acc;
            }, []);

        case 'skew_left':
            return [...Array(size)].map((e) => {
                return math.round(
                    jStat.exponential.sample(rate) - stdDev + mean, 1);
            });

        case 'skew_right':
            return [...Array(size)].map((e) => {
                return math.round(
                    (jStat.exponential.sample(rate) * -1) - stdDev + mean, 1);
            });

        case 'bimodal':
            return [...Array(size)].map((e, i) => {
                if (i % 2) {
                    return math.round(jStat.normal.sample(-3, stdDev), 1);
                } else {
                    return math.round(jStat.normal.sample(3, stdDev), 1);
                }
            });

        case 'uniform':
            return [...Array(size)].map((e) => {
                // Oversample the uniform distribution and then 'trim' off
                // extra values. This ensures that rounding doesn't taper the
                // distributions at the ends.
                let s = null;
                do {
                    s = math.round(jStat.uniform.sample(-1.1, 1.1), 1);
                } while (Math.abs(s) > 1);
                return s;
            });

        default:
            // return a normal distribution
            return [...Array(size)].map((e) => {
                return math.round(jStat.normal.sample(mean, stdDev), 1);
            });
        }

    }
    runSample() {
        // Use the base64 encoding of the seed as a simple hash
        let samplingSeed = window.btoa(this.state.seed);
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
                math.round(jStat.mean(e), 1)
            );
            return acc;
        }, []);

        let samplesGraphData = createScatterPlotHistogram(
            samples[0], NO_OF_BINS, MIN_BIN, MAX_BIN);

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
            sampleMeansGraphData: sampleMeans.slice(0, 1),
            samplesMax: samplesMaxFrequency,
            observationIdx: 1,
            observationData: [samplesGraphData[0]],
        });
    }
    handleSampleMeansIdx(idx) {
        let currentSampleMeans = this.state.sampleMeans.slice(0, idx);
        let currentSampleMeansData = createHistogramArray(
            currentSampleMeans,
            NO_OF_BINS,
            MIN_BIN,
            MAX_BIN);
        let samplesGraphData = createScatterPlotHistogram(
            this.state.samples[idx - 1],
            13,
            this.state.domain[0],
            this.state.domain[1]);

        this.setState({
            sampleMeansIdx: idx,
            sampleMeansGraphData: currentSampleMeansData,
            samplesGraphData: samplesGraphData,
            observationData: [samplesGraphData[this.state.observationIdx -1]],
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
            observationIdx: null,
            observationData: null,
        });
    }
    handleResetSimulation() {
        this.handleResetSamples();
        this.handleResetPopulation();
    }
    componentDidUpdate() {
        let params = new URLSearchParams(location.search);
        params.set('seed', this.state.seed);
        params.set('populationSize', this.state.populationSize);
        params.set('mean', this.state.mean);
        params.set('stdDev', this.state.stdDev);
        params.set('distType', this.state.distType);
        params.set('sampleSize', this.state.sampleSize);
        params.set('numberOfSamples', this.state.numberOfSamples);
        window.history.replaceState(null, '', '?' + params.toString());
    }
    render() {
        return (
            <>
            <Nav/>
            <div className='container'>
                <h2>Central Limit Theorem</h2>
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
                            handleObservationIdx={this.handleObservationIdx}
                            handleResetSamples={
                                this.handleResetSamples}/>
                    </div>
                    <div className='col-8' style={{maxHeight: '320px'}}>
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
                        <SampleMeansGraph
                            domain={this.state.domain}
                            range={
                                this.state.sampleMeansRange}
                            sampleMeansGraphData={
                                this.state
                                    .sampleMeansGraphData}/>
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
                    <CopyToClipboard text={location.href}>
                        <button type="button" className="btn btn-success">
                            Copy Link to Clipboard
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
            </>
        );
    }
}
