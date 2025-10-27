/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Preview } from '../App.jsx';
import { Nav } from '../Nav.jsx';
import { CentralLimitGraph } from '../central_limit_theorem/CentralLimitGraph';
import { forceNumber, createHistogramArray, getDomain,
    getHistogramMaxima, interpolateHistogram } from '../utils.js';

configure({adapter: new Adapter()});


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

describe('Check that the CentralLimitGraph conditionally renders components.', () => {
    test('That the population form is rendered when the seed is entered.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        // Assert that the elements are not present on load
        expect(wrapper.exists('#distType')).toEqual(false);
        expect(wrapper.exists('#mean')).toEqual(false);
        expect(wrapper.exists('#stdDev')).toEqual(false);
        expect(wrapper.exists('#generate-population')).toEqual(false);

        // Call update when you need to ensure that
        // child components are remounted
        clg_instance.handleChange('seed', 'my-new-seed');
        wrapper.update();
        expect(wrapper.exists('#distType')).toEqual(true);
        expect(wrapper.exists('#mean')).toEqual(true);
        expect(wrapper.exists('#stdDev')).toEqual(true);
        expect(wrapper.exists('#generate-population')).toEqual(true);

        // Now render a population and  delete the seed. Check that
        // the form is still present. We don't want the form to flash
        // if a user decides to change the seed.
        wrapper.find('#generate-population').simulate('submit');
        clg_instance.handleChange('seed', '');
        wrapper.update();
        expect(wrapper.exists('#distType')).toEqual(true);
        expect(wrapper.exists('#mean')).toEqual(true);
        expect(wrapper.exists('#stdDev')).toEqual(true);
        expect(wrapper.exists('#generate-population')).toEqual(true);
    });

    test('That the sample form is rendered once a population exists.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        // Call update when you need to ensure that
        // child components are remounted
        clg_instance.handleChange('seed', 'my-new-seed');
        wrapper.update();

        // Check that the elements don't exist
        expect(wrapper.exists('#sampleSize')).toEqual(false);
        expect(wrapper.exists('#numberOfSamples')).toEqual(false);
        expect(wrapper.exists('#run-sample')).toEqual(false);

        wrapper.find('#generate-population').simulate('submit');

        expect(wrapper.exists('#sampleSize')).toEqual(true);
        expect(wrapper.exists('#numberOfSamples')).toEqual(true);
        expect(wrapper.exists('#run-sample')).toEqual(true);
    });

    test('That the range inputs appear once a population is created.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        // Call update when you need to ensure that
        // child components are remounted
        clg_instance.handleChange('seed', 'my-new-seed');
        wrapper.update();

        // Check that the elements don't exist
        expect(wrapper.exists('#observation-idx')).toEqual(false);
        expect(wrapper.exists('#sample-means-idx')).toEqual(false);

        // Generate the population and samples
        wrapper.find('#generate-population').simulate('submit');
        wrapper.find('#run-sample').simulate('submit');

        expect(wrapper.exists('#observation-idx')).toEqual(true);
        expect(wrapper.exists('#sample-means-idx')).toEqual(true);
    });
});

describe('Check that the CentralLimitGraph renders graphs.', () => {
    test('That the population graph is rendered when the button is clicked.', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        clg_instance.handleChange('seed', 'my-new-seed');
        expect(clg.state('populationGraphData')).toEqual(null);

        wrapper.update();
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
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        clg_instance.handleChange('seed', 'my-new-seed');
        wrapper.update();
        wrapper.find('#generate-population').simulate('submit');
        expect(wrapper.exists('PopulationGraph')).toEqual(true);
        expect(wrapper.exists('SampleForm')).toEqual(true);
        // Then sample it and check the graph is rendered
        wrapper.find('#run-sample').simulate('submit');
        expect(wrapper.exists('SampleMeansGraph')).toEqual(true);
        expect(wrapper.exists('SampleRangeSlider')).toEqual(true);
    });
});

describe('Check that the CentralLimitGraph resets correctly.', () => {
    test('That generating a new population clears the current samples', () => {
        window.history.replaceState(null, '', '');
        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        // First generate the population
        clg_instance.handleChange('seed', 'my-new-seed');
        wrapper.update();
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
        let clg = wrapper.find('CentralLimitGraph');
        let clg_instance = clg.instance()
        clg_instance.handleChange('seed', 'my-new-seed');
        wrapper.update();
        wrapper.find('#generate-population').simulate('submit');
        wrapper.find('#run-sample').simulate('submit');

        // Check that the page resets itself
        wrapper.find('#reset-simulation').simulate('submit');
    });
});
