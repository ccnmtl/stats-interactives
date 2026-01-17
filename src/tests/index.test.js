import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Preview } from '../App.jsx';
import { Nav } from '../Nav.jsx';

test('Nav elements render as expected', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

test('Preview elements render as expected', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Preview />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
