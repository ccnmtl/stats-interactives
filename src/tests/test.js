import React, {Component} from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Nav, Preview} from '../App.jsx';

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
