/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Preview } from '../App.jsx';
import { Nav } from '../Nav.jsx';
import { CentralLimitGraph } from '../central_limit_theorem/CentralLimitGraph';
import { forceNumber, createHistogramArray, getDomain,
    getHistogramMaxima, interpolateHistogram } from '../utils.js';

configure({adapter: new Adapter()});

describe('Manipulate the seed param in the query string', () => {
    beforeEach(() => {
        window.history.replaceState(null, '', '?');
    });

    afterEach(() => {
        window.history.replaceState(null, '', '?');
    });

    test('When a seed is present in the query string that it ' +
            'is assigned to the component state', () => {
        window.history.replaceState(null, '', '?seed=foo');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        expect(wrapper.find('CentralLimitGraph').state('seed')).toEqual('foo');
    });
})

describe('Ensure that the same seed generates the same population and samples', () => {
    test('The same seed generates the same population', () => {
        // Render the graph with a seed, save the pop values
        // Render it with a different seed, test that its different
        // Render it again with the first seed and check its the same as the first

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph')
        let clg_instance = clg.instance()
        clg_instance.handleChange('populationSize', 50);

        // Render same data with a seed
        clg_instance.handleChange('seed', 'my-new-seed');
        clg_instance.handleGeneratePopulation();
        let pop1 = clg.state('population');

        // Render it with a different seed
        clg_instance.handleChange('seed', 'a-different-seed');
        clg_instance.handleGeneratePopulation();
        let pop2 = clg.state('population');

        // Render it again with the same seed as the first time
        clg_instance.handleChange('seed', 'my-new-seed');
        expect(clg.state('seed')).toEqual('my-new-seed');
        clg_instance.handleGeneratePopulation();
        let pop3 = clg.state('population');

        // Expect that data generated from different seeds is different
        expect(pop1).not.toEqual(pop2);

        // Expect that data generated from the same seed is the same
        expect(pop1).toEqual(pop3);
    });

    test('The same seed generates the same samples', () => {
        // Render the graph with a seed, save the pop values
        // Render it with a different seed, test that its different
        // Render it again with the first seed and check its the same as the first

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph')
        let clg_instance = clg.instance()

        // Render same data with a seed, and create the sample means
        // histogram of size 100
        clg_instance.handleChange('seed', 'my-new-seed');
        clg_instance.handleGeneratePopulation();
        clg_instance.runSample();
        clg_instance.handleSampleMeansIdx(100);
        let sample1 = clg.state('sampleMeans');
        let sampleData1 = clg.state('sampleMeansGraphData');

        // Render it with a different seed
        clg_instance.handleChange('seed', 'a-different-seed');
        clg_instance.handleGeneratePopulation();
        clg_instance.runSample();
        clg_instance.handleSampleMeansIdx(100);
        let sample2 = clg.state('sampleMeans');
        let sampleData2 = clg.state('sampleMeansGraphData');

        // Render it again with the same seed as the first time
        clg_instance.handleChange('seed', 'my-new-seed');
        clg_instance.handleGeneratePopulation();
        clg_instance.runSample();
        clg_instance.handleSampleMeansIdx(100);
        let sample3 = clg.state('sampleMeans');
        let sampleData3 = clg.state('sampleMeansGraphData');

        // Expect that data generated from different seeds is different
        expect(sample1).not.toEqual(sample2);
        expect(sampleData1).not.toEqual(sampleData2);

        // Expect that data generated from the same seed is the same
        expect(sample1).toEqual(sample3);
    })
});

test('Test that createHistogramArray returns an accurate histogram', () => {
    let sampleData = [0.1, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4 ]
    let expectedData = [[0.1, 1],
                        [0.2, 2],
                        [0.3, 3],
                        [0.4, 4]];
    let sum_of_frequencies = createHistogramArray(sampleData).reduce((acc, val) => {
        return acc + val[1];
    }, 0);

    expect(sum_of_frequencies).toEqual(sampleData.length);
});

test('Test that force number returns a number or undefined', () => {
    expect(forceNumber(42)).toEqual(42);
    expect(forceNumber('Lizard')).toEqual(0);
});

describe('Default behavior of query string params', () => {
    test('After rendering the Central Limit Graph, the expected params are populated.', () => {
        window.history.replaceState(null, '', '');

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let params = new URLSearchParams(location.search);

        expect(params.has('seed')).toEqual(true);
        expect(params.has('distType')).toEqual(true);
        expect(params.has('populationSize')).toEqual(true);
        expect(params.has('mean')).toEqual(true);
        expect(params.has('stdDev')).toEqual(true);
        expect(params.has('sampleSize')).toEqual(true);
        expect(params.has('numberOfSamples')).toEqual(true);
    });

    test('That the seed is set if one is given', () => {
        let emptyParams = new URLSearchParams();
        emptyParams.set('seed', 'foobar');
        window.history.replaceState(null, '', '?' + emptyParams.toString());

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let params = new URLSearchParams(location.search);

        expect(params.has('seed')).toEqual(true);
        expect(params.get('seed')).toEqual('foobar');
    });

    test('That the distType is set to skew_right if none is given.', () => {
        window.history.replaceState(null, '', '');

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let params = new URLSearchParams(location.search);

        expect(params.has('distType')).toEqual(true);
        expect(params.get('distType')).toEqual('skew_right');
    });

    test('That the distType is set to skew_right if an invalid one is given.', () => {
        let emptyParams = new URLSearchParams();
        emptyParams.set('distType', 'space-lizard');
        window.history.replaceState(null, '', '?' + emptyParams.toString());

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let params = new URLSearchParams(location.search);

        expect(params.has('distType')).toEqual(true);
        expect(params.get('distType')).toEqual('skew_right');
        // check the state too
        let clg = wrapper.find('CentralLimitGraph');
        expect(clg.state('distType')).toEqual('skew_right');
    });

    test('That the distType is set correctly when a valid one is given.', () => {
        let emptyParams = new URLSearchParams();
        emptyParams.set('distType', 'normal');
        window.history.replaceState(null, '', '?' + emptyParams.toString());

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let params = new URLSearchParams(location.search);

        expect(params.has('distType')).toEqual(true);
        expect(params.get('distType')).toEqual('normal');
    });
});

describe('Check that the CentralLimitGraph conditionally renders components.', () => {
    test('That the population graph is rendered but empty on load.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        expect(clg.state('populationGraphData')).toEqual(null);
        expect(wrapper.exists('PopulationGraph')).toEqual(true);

    });
    test('That the population graph is rendered when the button is clicked.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        expect(clg.state('populationGraphData')).toEqual(null);

        wrapper.find('#generate-population').simulate('submit');
        expect(clg.state('populationGraphData')).not.toEqual(null);
    });
    test('That the sample means graph is rendered when a sampling is run.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        // First generate the population
        wrapper.find('#generate-population').simulate('submit');
        expect(wrapper.exists('PopulationGraph')).toEqual(true);
        expect(wrapper.exists('SampleForm')).toEqual(true);
        // Then sample it and check the graph is rendered
        wrapper.find('#run-sample').simulate('submit');
        expect(wrapper.exists('SampleMeansGraph')).toEqual(true);
        expect(wrapper.exists('SampleRangeSlider')).toEqual(true);
    });
    test('That generating a new population clears the current samples', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        // First generate the population
        wrapper.find('#generate-population').simulate('submit');
        expect(wrapper.exists('PopulationGraph')).toEqual(true);
        expect(wrapper.exists('SampleForm')).toEqual(true);
        // Then sample it and check the graph is rendered
        wrapper.find('#run-sample').simulate('submit');
        expect(wrapper.exists('SampleMeansGraph')).toEqual(true);
        expect(wrapper.exists('SampleRangeSlider')).toEqual(true);
        expect(clg.state('sampleMeansGraphData')).not.toEqual(null);
        // Next generate a new population and assert that sample graph
        // data is no longer present
        wrapper.find('#generate-population').simulate('submit');
        expect(clg.state('sampleMeansGraphData')).toEqual(null);
    });
    test('That the Reset Simulation button correctly resets the interactive', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        // Generate the population and sample
        wrapper.find('#generate-population').simulate('submit');
        wrapper.find('#run-sample').simulate('submit');

        // Check that the page resets itself
        wrapper.find('#reset-simulation').simulate('submit');
    });
});
