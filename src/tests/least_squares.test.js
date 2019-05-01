/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Preview } from '../App.jsx';
import { Nav } from '../Nav.jsx';
import { LeastSquares } from '../estimation_least_squares/LeastSquares';
import { findLinearRegression, calculateSSE } from '../utils.js';
var seedrandom = require('seedrandom');

configure({adapter: new Adapter()});


describe('Ensure that the same seed generates the same population and samples', () => {
    test('The same seed generates the same population', () => {
        // Render the graph with a seed, save the pop values
        // Render it with a different seed, test that its different
        // Render it again with the first seed and check its the same as the first

        const wrapper = mount(
            <MemoryRouter>
                <LeastSquares />
            </MemoryRouter>
        );
        let clg = wrapper.find('LeastSquares')
        let clg_instance = clg.instance()

        // Render same data with a seed
        clg_instance.handleSeed('my-new-seed');
        clg_instance.handleGeneratePop();
        let pop1 = clg.state('population');

        // Render it with a different seed
        clg_instance.handleSeed('a-different-seed');
        clg_instance.handleGeneratePop();
        let pop2 = clg.state('population');

        // Render it again with the same seed as the first time
        clg_instance.handleSeed('my-new-seed');
        expect(clg.state('seed')).toEqual('my-new-seed');
        clg_instance.handleGeneratePop();
        let pop3 = clg.state('population');

        // Expect that data generated from different seeds is different
        expect(pop1).not.toEqual(pop2);

        // Expect that data generated from the same seed is the same
        expect(pop1).toEqual(pop3);
    });
});

test('Unit test validatePopulation', () => {
    const wrapper = mount(
        <MemoryRouter>
            <LeastSquares />
        </MemoryRouter>
    );
    let clg = wrapper.find('LeastSquares')
    let clg_instance = clg.instance()

    seedrandom('my-new-seed', {global: true});
    let pop = clg_instance.generatePopulation()

    let beta = null;
    let alpha = null;
    [beta, alpha] = findLinearRegression(pop);
    let bestFitFunc = (x) => {return beta * x + alpha;};
    let optimalSSE = calculateSSE(pop, bestFitFunc);

    expect(clg_instance.validatePopulation(pop)).toEqual(false);
});

test('Unit test generatePopulation', () => {
    const wrapper = mount(
        <MemoryRouter>
            <LeastSquares />
        </MemoryRouter>
    );
    let clg = wrapper.find('LeastSquares')
    let clg_instance = clg.instance()

    seedrandom('my-new-seed', {global: true});
    let pop = clg_instance.generatePopulation()

    expect(pop.length).toEqual(6);
    pop.map((val) => {
        expect(val[0] > -5).toEqual(true);
        expect(val[0] < 5).toEqual(true);
        expect(val[1] > -5).toEqual(true);
        expect(val[1] < 5).toEqual(true);
    })
})
