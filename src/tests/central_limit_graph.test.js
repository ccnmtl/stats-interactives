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
