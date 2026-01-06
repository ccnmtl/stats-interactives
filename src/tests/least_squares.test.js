import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { LeastSquares } from '../estimation_least_squares/LeastSquares';
import { findLinearRegression, calculateSSE } from '../utils.js';
import { generatePopulation, validatePopulation } from '../estimation_least_squares/logic';
var seedrandom = require('seedrandom');

// Mock child components to intercept props
const MockRegressionGraph = jest.fn(() => <div data-testid="reg-graph">Regression Graph</div>);
const MockErrorGraph = jest.fn(() => <div data-testid="err-graph">Error Graph</div>);

jest.mock('../estimation_least_squares/RegressionGraph', () => ({
    RegressionGraph: (props) => MockRegressionGraph(props)
}));
jest.mock('../estimation_least_squares/ErrorGraph', () => ({
    ErrorGraph: (props) => MockErrorGraph(props)
}));
// Mock GA
jest.mock('react-ga4', () => ({
    event: jest.fn(),
}));

describe('LeastSquares Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('The same seed generates the same population', () => {
        render(
            <MemoryRouter>
                <LeastSquares />
            </MemoryRouter>
        );

        // Inputs
        // Use getByLabelText for better accessibility and reliability
        const seedInputActual = screen.getByLabelText(/Seed/i);
        const generateButton = screen.getByText('Generate Samples'); // Button text updated based on RegressionForm.jsx value="Generate Samples"

        fireEvent.change(seedInputActual, { target: { value: 'my-new-seed' } });
        fireEvent.click(generateButton);

        expect(MockRegressionGraph).toHaveBeenCalled();
        const call1 = MockRegressionGraph.mock.calls[MockRegressionGraph.mock.calls.length - 1][0];
        const pop1 = call1.population;

        // Change seed
        fireEvent.change(seedInputActual, { target: { value: 'diff-seed' } });
        fireEvent.click(generateButton);

        const call2 = MockRegressionGraph.mock.calls[MockRegressionGraph.mock.calls.length - 1][0];
        const pop2 = call2.population;

        expect(pop1).not.toEqual(pop2);

        // Restore seed
        fireEvent.change(seedInputActual, { target: { value: 'my-new-seed' } });
        fireEvent.click(generateButton);

        const call3 = MockRegressionGraph.mock.calls[MockRegressionGraph.mock.calls.length - 1][0];
        const pop3 = call3.population;

        expect(pop1).toEqual(pop3);
    });
});

test('Unit test validatePopulation', () => {
    // Generate a random pop to test structure, but we want to fail validation intentionally?
    // Or pass.
    // The original test generated a pop, calculated regression, and asserted false?
    // "expect(clg_instance.validatePopulation(pop)).toEqual(false);"
    // It seems the original test expected the *randomly generated* pop (from seed 'my-new-seed') to be invalid?
    // Be careful. `seedrandom` behavior might change if dependencies changed? 
    // No, `seedrandom` is stable.

    // We can reconstruct the test using the extracted function.
    seedrandom('my-new-seed', { global: true });
    let pop = generatePopulation();

    let beta = null;
    let alpha = null;
    [beta, alpha] = findLinearRegression(pop);
    let bestFitFunc = (x) => { return beta * x + alpha; };
    let optimalSSE = calculateSSE(pop, bestFitFunc);

    expect(validatePopulation(pop, alpha, beta, optimalSSE)).toEqual(false);
});

test('Unit test generatePopulation', () => {
    seedrandom('my-new-seed', { global: true });
    let pop = generatePopulation();

    expect(pop.length).toEqual(6);
    pop.map((val) => {
        expect(val[0] > -5).toEqual(true); // -4 to 4 range
        expect(val[0] < 5).toEqual(true);
        expect(val[1] > -5).toEqual(true);
        expect(val[1] < 5).toEqual(true);
    });
});
