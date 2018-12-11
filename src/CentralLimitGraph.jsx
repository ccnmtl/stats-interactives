import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis } from 'victory';
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

export const getDomain = (hist) => {
    let domain = hist.map((e) => e[0]);
    return [
        Math.min(...domain),
        Math.max(...domain)];
};

const getHistogramMaxima = (hist) => {
    return Math.max(...hist.map((e) => e[1]));
};

const interpolateHistogram = (hist) => {
    // The function fills in data with values less than the
    // original histogram value.
    return hist.reduce((acc, e) => {
        // [val, int]
        acc.push(e);
        if (e[1] > 1) {
            math.range(1, e[1]).map((i) => {
                acc.push([e[0], i]);
            });
        }
        return acc;
    }, []);
};

const PopulationGraph  = ({populationGraphData, samplesGraphData, domain}) => {
    let populationMax = getHistogramMaxima(populationGraphData);
    let samplesMax = getHistogramMaxima(samplesGraphData);
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            domain={{x: domain}}
            height={200}>
            <VictoryBar data={populationGraphData}
                x={0}
                y={(datum) => datum[1] / populationMax}/>
            {samplesGraphData &&
                <VictoryScatter data={interpolateHistogram(samplesGraphData)}
                    style={{ data: { fill: 'red' } }}
                    x={0}
                    y={(datum) => (datum[1] / samplesMax) * 0.75}/>
            }
            <VictoryAxis />
        </VictoryChart>
        </>
    );
};

const SampleMeansGraph = ({sampleMeansGraphData, domain, range}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            domain={{x: domain, y: range}}
            height={250}>
            { sampleMeansGraphData &&
                <VictoryBar data={sampleMeansGraphData}
                    x={0}
                    y={1}/>
            }
            <VictoryAxis />
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
];

const PopulationForm  = (
    {seed, populationSize, mean, stdDev, distType, embed,
        sampleSize, handleChange}) => {
    const handleFormChange = (e) => {
        let numericFields = ['populationSize', 'mean', 'stdDev'];
        if (numericFields.includes(e.target.id)) {
            handleChange(e.target.id, forceNumber(e.target.value));
        } else {
            handleChange(e.target.id, e.target.value);
        }
    };
    return (
        <>
        <form action="">
            <fieldset>
                <legend>Population Parameters</legend>
                { !embed &&
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="seed" className="float-right">
                                Seed: </label>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="text"
                                id="seed"
                                value={seed}
                                onChange={handleFormChange}/>
                        </div>
                    </div> }
                { !embed &&
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="populationSize"
                                className="float-right">
                                Population Size: </label>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="number"
                                id="populationSize"
                                value={populationSize}
                                onChange={handleFormChange}/>
                        </div>
                    </div> }
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="distType"
                            className="float-right">
                            Distribution Type: </label>
                    </div>
                    <div className="form-group col-md-8">
                        <select id="distType"
                            onChange={handleFormChange}
                            value={distType}>
                            { DISTRIBUTION_TYPE.map(
                                (e) => (<option key={e.value} value={e.value}>
                                    {e.display}</option>)) }
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="mean"
                            className="float-right">Mean:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="number"
                            id="mean"
                            min="-10"
                            max="10"
                            value={mean}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="stdDev"
                            className="float-right">StdDev: </label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="number"
                            id="stdDev"
                            min="-6"
                            max="6"
                            value={stdDev}
                            onChange={handleFormChange}/>
                    </div>
                </div>
            </fieldset>
        </form>
        </>
    );
};

const SampleForm = ({
    sampleSize, numberOfSamples, handleChange, runSample, sampleMeansIdx,
    enableSampleSlider, handleSampleMeansIdx}) => {

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
        <form onClick={handleRunSample} >
            <fieldset>
                <legend>Sample Parameters</legend>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="sampleSize"
                            className="float-right">Sample Size: </label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="number"
                            id="sampleSize"
                            min="1"
                            max="1000"
                            value={sampleSize}
                            onChange={handleFormChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="numberOfSamples"
                            className="float-right">Number of samples:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="number"
                            id="numberOfSamples"
                            min="1"
                            value={numberOfSamples}
                            onChange={handleFormChange}/>
                    </div>
                </div>
            </fieldset>
            <input className="btn btn-primary shim-top"
                type="submit"
                value="Run Sample"/>
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

export class CentralLimitGraph extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.generatePopulation = this.generatePopulation.bind(this);
        this.runSample = this.runSample.bind(this);
        this.handleSampleMeansIdx = this.handleSampleMeansIdx.bind(this);
        this.handleSamplesIdx = this.handleSamplesIdx.bind(this);

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
        const population = this.generatePopulation(
            populationSize,
            mean,
            stdDev,
            distType,
            seed
        );
        const populationGraphData = createHistogramArray(population);

        const defaultSampleSize = 50;
        const defaultNumberOfSamples = 1000;

        this.state = {
            seed: seed,
            populationSize: populationSize,
            population: population,
            populationGraphData: populationGraphData,
            mean: mean,
            stdDev: stdDev,
            distType: distType,
            // sampleSize is the number of observations within each sample
            sampleSize: defaultSampleSize,
            // number of samples is the overall samples taken of a population
            numberOfSamples: defaultNumberOfSamples,
            samples: [],
            samplesIdx: 1,
            samplesGraphData: [],
            sampleMeans: [],
            sampleMeansIdx: 1,
            sampleMeansGraphData: [],
            enableSampleSlider: false,
            domain: [-6, 6],
            sampleMeansRange: [0, 1],
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
            domain: getDomain(populationGraphData),
            [key]: value
        });
    }
    generatePopulation(size, mean, stdDev, distType, seed) {
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
                return math.round(jStat.beta.sample(2, 5) * 10, 1);
            });

        case 'skew_right':
            return [...Array(size)].map((e) => {
                return math.round(jStat.beta.sample(5, 2) * 10, 1);
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

        this.setState({
            samples: samples,
            sampleMeans: sampleMeans,
            sampleMeansRange: [
                0,
                getHistogramMaxima(createHistogramArray(sampleMeans))
            ],
            sampleMeansIdx: 1,
            enableSampleSlider: true,
            samplesGraphData: createHistogramArray(samples[1]),
            sampleMeansGraphData: sampleMeans.slice(0, 1)
        });
    }
    handleSampleMeansIdx(idx) {
        let currentSampleMeans = this.state.sampleMeans.slice(0, idx);
        let currentSampleMeansData = createHistogramArray(currentSampleMeans);
        this.setState({
            sampleMeansIdx: idx,
            sampleMeansGraphData: currentSampleMeansData,
            samplesGraphData: createHistogramArray(this.state.samples[idx - 1])
        });
    }
    handleSamplesIdx(idx) {
        // This is the for individual sample slider
        this.setState({
            samplesIdx: idx,
            samplesGraphData: createHistogramArray(this.state.samples[idx - 1]),
        });
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
                        <PopulationGraph
                            populationGraphData={this.state.populationGraphData}
                            samplesGraphData={this.state.samplesGraphData}
                            domain={this.state.domain}
                        />
                    </div>
                    <div className='col-md-6'>
                        <PopulationForm seed={this.state.seed}
                            populationSize={this.state.populationSize}
                            mean={this.state.mean}
                            stdDev={this.state.stdDev}
                            distType={this.state.distType}
                            embed={this.state.embed}
                            sampleSize={this.state.sampleSize}
                            handleChange={this.handleChange}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <SampleMeansGraph
                            domain={this.state.domain}
                            range={this.state.sampleMeansRange}
                            sampleMeansGraphData={
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
            </div>
            </>
        );
    }
}

PopulationGraph.propTypes = {
    populationGraphData: PropTypes.array,
    samplesGraphData: PropTypes.array,
};

SampleMeansGraph.propTypes = {
    sampleMeansGraphData: PropTypes.array,
};

PopulationForm.propTypes = {
    seed: PropTypes.string,
    populationSize: PropTypes.number,
    mean: PropTypes.number,
    stdDev: PropTypes.number,
    distType: PropTypes.string,
    embed: PropTypes.bool,
    handleChange: PropTypes.func,
};

SampleForm.propTypes = {
    sampleSize: PropTypes.number,
    numberOfSamples: PropTypes.number,
    handleChange: PropTypes.func,
    runSample: PropTypes.func,
    sampleMeansIdx: PropTypes.number,
    enableSampleSlider: PropTypes.bool,
    handleSampleMeansIdx: PropTypes.func,
};
