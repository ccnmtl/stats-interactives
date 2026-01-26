import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LeastSquares } from '../estimation_least_squares/LeastSquares';
import { 
    findLinearRegression, 
    calculateSSE, 
    generateLeastSquaresPopulation, 
    validateLeastSquaresPopulation 
} from '../utils.js';
var seedrandom = require('seedrandom');

describe('LeastSquares Component', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <LeastSquares />
            </MemoryRouter>
        );
        expect(screen.getByText('Estimation of Least Squares')).toBeInTheDocument();
    });

    test('Unit test validatePopulation', () => {
        seedrandom('my-new-seed', {global: true});
        let pop = generateLeastSquaresPopulation();

        let beta = null;
        let alpha = null;
        [beta, alpha] = findLinearRegression(pop);
        let bestFitFunc = (x) => {return beta * x + alpha;};
        let optimalSSE = calculateSSE(pop, bestFitFunc);

        // Based on original test expectation
        expect(validateLeastSquaresPopulation(pop, alpha, beta, optimalSSE)).toEqual(false);
    });

    test('Unit test generatePopulation checks range', () => {
        seedrandom('my-new-seed', {global: true});
        let pop = generateLeastSquaresPopulation();

        expect(pop.length).toEqual(6);
        pop.forEach((val) => {
            expect(val[0]).toBeGreaterThan(-5);
            expect(val[0]).toBeLessThan(5);
            expect(val[1]).toBeGreaterThan(-5);
            expect(val[1]).toBeLessThan(5);
        });
    });

    test('The same seed generates the same population (Utility test)', () => {
        // Since we can't easily check component internal state, we test the generator logic directly
        // which the component uses.
        
        seedrandom('seed-1', {global: true});
        const pop1 = generateLeastSquaresPopulation();
        
        seedrandom('seed-2', {global: true});
        const pop2 = generateLeastSquaresPopulation();
        
        seedrandom('seed-1', {global: true});
        const pop3 = generateLeastSquaresPopulation();

        expect(pop1).not.toEqual(pop2);
        expect(pop1).toEqual(pop3);
    });
    
    // Setup for component integration test if needed
    // We would look for buttons: "Generate Population" etc.
   /*
    test('Validation form interactions', async () => {
       render(
            <MemoryRouter>
                <LeastSquares />
            </MemoryRouter>
        );
        // Fill in seed
        // Click Generate
        // Expect graph or stats to appear
    });
    */
});

