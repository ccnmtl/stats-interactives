/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis } from 'victory';
import * as math from 'mathjs';
import {Nav} from './Nav.jsx';
var seedrandom = require('seedrandom');
var jStat = require('jStat').jStat;

export const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

export const createHistogramArray = (dist) => {
    let xSet = new Set(dist);

    // Build an array: [[val, 0], ...]
    // where 0 is an initial value for some val's frquency
    const setRedux = (acc, val) => {
        acc.push([val[0], 0]);
        return acc;
    };

    let xSetList = [...xSet.entries()].reduce(setRedux, new Array(0));

    const redux = (acc, val) => {
        // findVal needs to be declared each time to
        // create a closure with val
        let findVal = (el) => el[0] == val;
        let idx = acc.findIndex(findVal);
        // When an index is found, increase its frequency by one
        if (idx > -1) {
            acc[idx][1] += 1;
        }
        return acc;
    };

    return dist.reduce(redux, xSetList);
};

const PopulationGraph  = ({populationGraphData}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            height={200}>
            <VictoryBar data={populationGraphData}
                x={0}
                y={1}/>
        </VictoryChart>
        </>
    );
};

const SampleMeansGraph = ({sampleMeansGraphData}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            height={250}
            domain={{x: [-1, 1], y: [0, 200]}}
            domainPadding={{x: 20}}
        >
            { sampleMeansGraphData &&
                <VictoryBar data={sampleMeansGraphData}
                    x={0}
                    y={1}/>
            }
            <VictoryAxis
            />
            <VictoryAxis dependentAxis
                offsetX={50}
            />
        </VictoryChart>
        </>
    );
};

const DISTRIBUTION_TYPE = [
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
]

const PopulationForm  = ({seed,
    populationSize, mean, stdDev, distType, handleChange}) => {
    const handleFormChange = (e) => {
        handleChange(e.target.id, e.target.value);
    };
    return (
        <>
        <h3>Population Params</h3>
        <form action="">
            <div>
                <label htmlFor="seed">Seed: </label>
                <input type="text"
                    id="seed"
                    value={seed}
                    onChange={handleFormChange}/>
            </div>
            <div>
                <label htmlFor="populationSize">Population Size: </label>
                <input type="number"
                    id="populationSize"
                    value={populationSize}
                    onChange={handleFormChange}/>
            </div>
            <div>
                <label htmlFor="distributionType">Distribution Type: </label>
                <select id="distType" onChange={handleFormChange} value={distType}>
                    { DISTRIBUTION_TYPE.map(
                        (e) => (<option key={e.value} value={e.value}>{e.display}</option>)) }
                </select>
            </div>
            <div>
                <label htmlFor="mean">Mean: </label>
                <input type="number"
                    id="mean"
                    value={mean}
                    onChange={handleFormChange}/>
            </div>
            <div>
                <label htmlFor="stdDev">StdDev: </label>
                <input type="number"
                    id="stdDev"
                    value={stdDev}
                    onChange={handleFormChange}/>
            </div>
        </form>
        </>
    );
};

const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, sampleMeansIdx, enableSampleSlider, handleSampleMeansIdx}) => {

    const handleFormChange = (e) => {
        handleChange(e.target.id, e.target.value);
    };

    const handleRunSample = (e) => {
        e.preventDefault();
        runSample();
    };

    const handleSampleMeans = (e) => {
        e.preventDefault();
        handleSampleMeansIdx(forceNumber(e.target.value));
    };
    return (
        <>
        <h3>Sample Params</h3>
        <form onClick={handleRunSample} >
            <div>
                <label htmlFor="sampleSize">Sample Size: </label>
                <input type="number"
                    id="sampleSize"
                    value={sampleSize}
                    onChange={handleFormChange}/>
            </div>
            <div>
                <label htmlFor="numberOfSamples">Number of samples: </label>
                <input type="number"
                    id="numberOfSamples"
                    value={numberOfSamples}
                    onChange={handleFormChange}/>
            </div>
            <div>
                <input type="submit" value="Run Sample"/>
            </div>
        </form>
        <form>
            <div>
                <input type="range"
                    id="sample-slider"
                    disabled={ enableSampleSlider ? false : true}
                    min="1"
                    max={numberOfSamples}
                    value={sampleMeansIdx}
                    onChange={handleSampleMeans} />
            </div>
        </form>
        </>
    );
};

const DebugData = ({seed, populationSize, mean, stdDev,
    sampleSize, numberOfSamples, sampleMeansIdx}) => {
    return (
        <>
        <h3>Debug Data</h3>
        <table>
            <tbody>
                <tr>
                    <td>seed</td>
                    <td>{seed}</td>
                </tr>
                <tr>
                    <td>populationSize</td>
                    <td>{populationSize}</td>
                </tr>
                <tr>
                    <td>mean</td>
                    <td>{mean}</td>
                </tr>
                <tr>
                    <td>Standard Deviation</td>
                    <td>{stdDev}</td>
                </tr>
                <tr>
                    <td>Sample Size</td>
                    <td>{sampleSize}</td>
                </tr>
                <tr>
                    <td>Number of samples</td>
                    <td>{numberOfSamples}</td>
                </tr>
                <tr>
                    <td>Samples Index Slider</td>
                    <td>{sampleMeansIdx}</td>
                </tr>
            </tbody>
        </table>
        </>
    );
};
export class CentralLimitGraph extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.generatePopulation = this.generatePopulation.bind(this);
        this.runSample = this.runSample.bind(this);
        this.handleSampleMeansIdx = this.handleSampleMeansIdx.bind(this);

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
            // Validate that a dist type is on the list, else set it to 'skew_left'
            let dt = params.get('distType');
            let found = DISTRIBUTION_TYPE.find((e) => {return dt === e.value});
            distType = found ? dt : 'skew_left'
            if (!found) {
                params.set('distType', 'skew_left');
                window.history.replaceState(null, '', '?' + params.toString());
            }
        }

        const populationSize = 100000;
        const mean = 0;
        const stdDev = 1;
        const population = this.generatePopulation(
            populationSize,
            mean,
            stdDev,
            distType,
            seed
        );
        const populationGraphData = createHistogramArray(population);

        this.state = {
            seed: seed,
            populationSize: populationSize,
            population: population,
            populationGraphData: populationGraphData,
            mean: mean,
            stdDev: stdDev,
            distType: distType,
            // sampleSize is the number of observations within each sample
            sampleSize: 30,
            // number of samples is the overall samples taken of a population
            numberOfSamples: 1000,
            sampleMeans: [],
            sampleMeansIdx: 1,
            sampleMeansGraphData: [],
            enableSampleSlider: false,
            embed: (() => {
                return params.get('embed') === 'true' ? true : false;
            })(),
        };
    }
    handleChange(key, value) {
        const population = this.generatePopulation(
            key === 'populationSize' ? value : this.state.populationSize,
            key === 'mean' ? value : this.state.mean,
            key === 'stdDev' ? value : this.state.stdDev,
            key === 'distType' ? value : this.state.distType,
            key === 'seed' ? value : this.state.seed
        );
        const populationGraphData = createHistogramArray(population);
        this.setState({
            population: population,
            populationGraphData: populationGraphData,
            [key]: value
        });
    }
    handleSampleMeansIdx(idx) {
        let currentSampleMeans = this.state.sampleMeans.slice(0, idx);
        let currentSampleMeansData = createHistogramArray(currentSampleMeans);
        this.setState({
            sampleMeansIdx: idx,
            sampleMeansGraphData: currentSampleMeansData
        });
    }
    generatePopulation(size, mean, stdDev, distType, seed) {
        // Reset the global Math.random everytime this is called
        seedrandom(seed, {global: true});

        switch (distType) {
            case 'normal':
                return [...Array(size)].map((e) => {
                    return math.round(jStat.normal.sample(mean, stdDev), 1)
                });
                break;

            case 'skew_left':
                return [...Array(size)].map((e) => {
                    return math.round(jStat.beta.sample(2, 5), 1)
                });
                break;

            case 'skew_right':
                return [...Array(size)].map((e) => {
                    return math.round(jStat.beta.sample(5, 2), 1)
                });
                break;

            case 'bimodal':
                return [...Array(size)].map((e) => {
                    // algo from here: https://en.wikipedia.org/wiki/Multimodal_distribution#Probability_distributions
                    let a = 2 + jStat.normal.sample(0, 1);
                    let b = 5 + jStat.normal.sample(0, 1)
                    return math.round(a / b, 1)
                });
                break;

            case 'uniform':
                return [...Array(size)].map((e) => {
                    return math.round(jStat.uniform.sample(-1, 1), 1)
                });
                break;

            default:
                // return a normal distribution
                return [...Array(size)].map((e) => {
                    return math.round(jStat.normal.sample(mean, stdDev), 1)
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
        let sampleMeans = new Array(this.state.numberOfSamples);
        for (var i = 0; i < this.state.numberOfSamples; i++) {
            let samples = new Array(this.state.sampleSize);
            for (var j = 0; j < this.state.sampleSize; j++) {
                let observationIdx = Math.floor(ng() * this.state.population.length);
                samples[j] = this.state.population[observationIdx];
            }
            let mean = jStat.mean(samples);
            sampleMeans[i] = math.round(mean, 1);
        }

        this.setState({
            sampleMeans: sampleMeans,
            sampleMeansIdx: 1,
            enableSampleSlider: true
        });
        this.handleSampleMeansIdx(1);
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
            {
                !this.state.embed && <Nav />
            }
            <div className='container'>
                <h2>Central Limit Theorem</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <PopulationGraph populationGraphData={
                            this.state.populationGraphData}/>
                    </div>
                    <div className='col-md-6'>
                        <PopulationForm seed={this.state.seed}
                            populationSize={this.state.populationSize}
                            mean={this.state.mean}
                            stdDev={this.state.stdDev}
                            distType={this.state.distType}
                            handleChange={this.handleChange}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <SampleMeansGraph sampleMeansGraphData={
                            this.state.sampleMeansGraphData}/>
                    </div>
                    <div className='col-md-6'>
                        <SampleForm
                            sampleSize={this.state.sampleSize}
                            numberOfSamples={this.state.numberOfSamples}
                            handleChange={this.handleChange}
                            runSample={this.runSample}
                            sampleMeansIdx={this.state.sampleMeansIdx}
                            enableSampleSlider={this.state.enableSampleSlider}
                            handleSampleMeansIdx={this.handleSampleMeansIdx} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <DebugData seed={this.state.seed}
                            populationSize={this.state.populationSize}
                            mean={this.state.mean}
                            stdDev={this.state.stdDev}
                            sampleSize={this.state.sampleSize}
                            numberOfSamples={this.state.numberOfSamples}
                            sampleMeansIdx={this.state.sampleMeansIdx} />
                    </div>
                </div>
            </div>
            </>
        );
    }
}

PopulationGraph.propTypes = {
    populationGraphData: PropTypes.array,
}

SampleMeansGraph.propTypes = {
    sampleMeansGraphData: PropTypes.array,
}

PopulationForm.propTypes = {
    seed: PropTypes.string,
    populationSize: PropTypes.number,
    mean: PropTypes.number,
    stdDev: PropTypes.number,
    distType: PropTypes.string,
    handleChange: PropTypes.func,
}

SampleForm.propTypes = {
    sampleSize: PropTypes.number,
    numberOfSamples: PropTypes.number,
    handleChange: PropTypes.func,
    runSample: PropTypes.func,
    sampleMeansIdx: PropTypes.number,
    enableSampleSlider: PropTypes.bool,
    handleSampleMeansIdx: PropTypes.func,
}
