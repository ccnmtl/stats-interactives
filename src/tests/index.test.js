/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Preview} from '../App.jsx';
import {Nav} from '../Nav.jsx';
import { CentralLimitGraph } from '../central_limit_theorem/CentralLimitGraph';

test('Nav elements render as expected', () => {
    const component = renderer.create(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Preview elements render as expected', () => {
    const component = renderer.create(
        <MemoryRouter>
            <Preview />
        </MemoryRouter>,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
