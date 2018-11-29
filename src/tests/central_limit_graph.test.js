/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Preview} from '../App.jsx';
import {Nav} from '../Nav.jsx';
import { CentralLimitGraph, createHistogramArray, forceNumber } from '../CentralLimitGraph';

configure({adapter: new Adapter()});

describe('Manipulate the seed param in the query string', () => {
    beforeEach(() => {
        window.history.replaceState(null, '', '?');
    });

    afterEach(() => {
        window.history.replaceState(null, '', '?');
    });

    test('When no seed is set in query string, one is generated', () => {
        Date.now = jest.fn(() => 1234567890);
        const component = renderer.create(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        let params = new URLSearchParams(location.search);
        expect(params.get('seed')).toEqual('1234567890');
    })

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

describe('Conditionally show the nav based on embed query string param', () => {
    beforeEach(() => {
        window.history.replaceState(null, '', '?');
    });

    afterEach(() => {
        window.history.replaceState(null, '', '?');
    });

    test('When embed=true nav is not present', () => {
        window.history.replaceState(null, '', '?embed=true');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        expect(wrapper.find('Nav').exists()).toEqual(false);
    });

    test('When embed=false nav is present', () => {
        window.history.replaceState(null, '', '?embed=false');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        expect(wrapper.find('Nav').exists()).toEqual(true);
    });

    test('When embed=some-nonsense-value nav is still present', () => {
        window.history.replaceState(null, '', '?embed=some-nonsense-value');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        expect(wrapper.find('Nav').exists()).toEqual(true);
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

        // Render same data with a seed
        clg_instance.handleChange('seed', 'my-new-seed');
        let pop1 = clg.state('population');
        let popData1 = clg.state('populationGraphData');

        // Render it with a different seed
        clg_instance.handleChange('seed', 'a-different-seed');
        let pop2 = clg.state('population');
        let popData2 = clg.state('populationGraphData');

        // Render it again with the same seed as the first time
        clg_instance.handleChange('seed', 'my-new-seed');
        let pop3 = clg.state('population');
        let popData3 = clg.state('populationGraphData');

        // Expect that data generated from different seeds is different
        expect(pop1).not.toEqual(pop2);
        expect(popData1).not.toEqual(popData2);

        // Expect that data generated from the same seed is the same
        expect(pop1).toEqual(pop3);
        expect(popData1).toEqual(popData3);
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

        // Render same data with a seed
        clg_instance.handleChange('seed', 'my-new-seed');
        clg_instance.runSample();
        let sample1 = clg.state('sampleMeans');
        let sampleData1 = clg.state('sampleMeansGraphData');

        // Render it with a different seed
        clg_instance.handleChange('seed', 'a-different-seed');
        clg_instance.runSample();
        let sample2 = clg.state('sampleMeans');
        let sampleData2 = clg.state('sampleMeansGraphData');

        // Render it again with the same seed as the first time
        clg_instance.handleChange('seed', 'my-new-seed');
        clg_instance.runSample();
        let sample3 = clg.state('sampleMeans');
        let sampleData3 = clg.state('sampleMeansGraphData');

        // Expect that data generated from different seeds is different
        expect(sample1).not.toEqual(sample2);
        expect(sampleData1).not.toEqual(sampleData2);

        // Expect that data generated from the same seed is the same
        expect(sample1).toEqual(sample3);
        expect(sampleData1).toEqual(sampleData3);
    })
});

test('The getSampleHistorgram function renders a histogram of the correct size', () => {
    const wrapper = mount(
        <MemoryRouter>
            <CentralLimitGraph />
        </MemoryRouter>
    );
    let clg = wrapper.find('CentralLimitGraph');
    let clg_instance = clg.instance();

    // Call clg_instance.handleSampleMeansIdx(42)
    // Two side effects should happen:
    //  - this.state.sampleMeansIdx == 42
    //  - this.state.samplesMeansGraphData should contain a histogram
    //    whose values sum up to 42

    // First get some samples
    clg_instance.runSample();
    clg_instance.handleSampleMeansIdx(42);
    expect(clg.state('sampleMeansIdx')).toEqual(42);

    // Histogram is a 2D array of [[val, frequency], ...]
    let histogram = clg.state('sampleMeansGraphData')
    let histogramValSum = 0;
    histogram.forEach((e) => { histogramValSum += e[1]});
    expect(histogramValSum).toEqual(42);
});

test('Test that createHistogramArray returns an accurate histogram', () => {
    let sampleData = [0.1, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4 ]
    let expectedData = [[0.1, 1],
                        [0.2, 2],
                        [0.3, 3],
                        [0.4, 4]];

    expect(createHistogramArray(sampleData)).toEqual(expectedData);
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

    test('That the distType is set to skew_left if none is given.', () => {
        window.history.replaceState(null, '', '');

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let params = new URLSearchParams(location.search);

        expect(params.has('distType')).toEqual(true);
        expect(params.get('distType')).toEqual('skew_left');
    });

    test('That the distType is set to skew_left if an invalid one is given.', () => {
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
        expect(params.get('distType')).toEqual('skew_left');
        // check the state too
        let clg = wrapper.find('CentralLimitGraph');
        expect(clg.state('distType')).toEqual('skew_left');
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

describe('embed query string param', () => {
    test('That the seed and population fields are present when embed is set.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');

        expect(clg.exists('#seed')).toEqual(true);
        expect(clg.exists('#populationSize')).toEqual(true);
    });

    test('That the seed and population fields are not present when embed=true', () => {
        let emptyParams = new URLSearchParams();
        emptyParams.set('embed', 'true');
        window.history.replaceState(null, '', '?' + emptyParams.toString());

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');

        expect(clg.exists('#seed')).toEqual(false);
        expect(clg.exists('#populationSize')).toEqual(false);
    });
});
