/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Preview} from '../App.jsx';
import {Nav} from '../Nav.jsx';
import { CentralLimitGraph } from '../CentralLimitGraph';

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
        // render the graph with a seed, save the pop values
        // Render it with a different seed, test that its different
        // Render it again with the first seed and check its the same as the first

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        // Render same data with a seed
        wrapper.find('CentralLimitGraph').instance().handleChange('seed', 'my-new-seed');
        let pop1 = wrapper.find('CentralLimitGraph').state('population');
        let popData1 = wrapper.find('CentralLimitGraph').state('populationGraphData');

        // Render it with a different seed
        wrapper.find('CentralLimitGraph').instance().handleChange('seed', 'a-different-seed');
        let pop2 = wrapper.find('CentralLimitGraph').state('population');
        let popData2 = wrapper.find('CentralLimitGraph').state('populationGraphData');

        // Render it again with the same seed as the first time
        wrapper.find('CentralLimitGraph').instance().handleChange('seed', 'my-new-seed');
        let pop3 = wrapper.find('CentralLimitGraph').state('population');
        let popData3 = wrapper.find('CentralLimitGraph').state('populationGraphData');

        // Expect that data generated from different seeds is different
        expect(pop1).not.toEqual(pop2);
        expect(popData1).not.toEqual(popData2);

        // Expect that data generated from the same seed is the same
        expect(pop1).toEqual(pop3);
        expect(popData1).toEqual(popData3);
    });

    test('The same seed generates the same samples', () => {
        // render the graph with a seed, save the pop values
        // Render it with a different seed, test that its different
        // Render it again with the first seed and check its the same as the first

        const wrapper = mount(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        // Render same data with a seed
        wrapper.find('CentralLimitGraph').instance().handleChange('seed', 'my-new-seed');
        wrapper.find('CentralLimitGraph').instance().runSample();
        let sample1 = wrapper.find('CentralLimitGraph').state('sampleMeans');
        let sampleData1 = wrapper.find('CentralLimitGraph').state('sampleMeansGraphData');

        // Render it with a different seed
        wrapper.find('CentralLimitGraph').instance().handleChange('seed', 'a-different-seed');
        wrapper.find('CentralLimitGraph').instance().runSample();
        let sample2 = wrapper.find('CentralLimitGraph').state('sampleMeans');
        let sampleData2 = wrapper.find('CentralLimitGraph').state('sampleMeansGraphData');

        // Render it again with the same seed as the first time
        wrapper.find('CentralLimitGraph').instance().handleChange('seed', 'my-new-seed');
        wrapper.find('CentralLimitGraph').instance().runSample();
        let sample3 = wrapper.find('CentralLimitGraph').state('sampleMeans');
        let sampleData3 = wrapper.find('CentralLimitGraph').state('sampleMeansGraphData');

        // Expect that data generated from different seeds is different
        expect(sample1).not.toEqual(sample2);
        expect(sampleData1).not.toEqual(sampleData2);

        // Expect that data generated from the same seed is the same
        expect(sample1).toEqual(sample3);
        expect(sampleData1).toEqual(sampleData3);
    })
});
