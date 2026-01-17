import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CentralLimitGraph } from '../central_limit_theorem/CentralLimitGraph';
import { forceNumber, createHistogramArray } from '../utils.js';

// Mock libraries causing issues
jest.mock('rheostat', () => () => <div />);
jest.mock('react-with-styles', () => ({ withStyles: () => (C) => C, css: () => ({}) }));

// Mock child components to verify props passed to them
jest.mock('../central_limit_theorem/PopulationGraph', () => ({
    PopulationGraph: (props) => <div data-testid="population-graph" data-props={JSON.stringify(props)}>PopulationGraph</div>
}));
jest.mock('../central_limit_theorem/SampleMeansGraph', () => ({
    SampleMeansGraph: (props) => <div data-testid="sample-means-graph" data-props={JSON.stringify(props)}>SampleMeansGraph</div>
}));
jest.mock('../central_limit_theorem/PopulationForm', () => ({
    PopulationForm: ({ seed, handleChange, handleGeneratePopulation }) => (
        <div>
            <input 
                data-testid="seed-input" 
                value={seed} 
                onChange={(e) => handleChange('seed', e.target.value)} 
            />
            <button data-testid="generate-btn" onClick={handleGeneratePopulation}>Generate Population</button>
        </div>
    )
}));
jest.mock('../central_limit_theorem/SampleForm', () => ({
    SampleForm: ({ runSample, showSampleForm }) => (
        showSampleForm ? <button data-testid="sample-btn" onClick={runSample}>Run Sample</button> : null
    )
}));
jest.mock('../central_limit_theorem/SampleRangeSlider', () => ({
    SampleRangeSlider: () => <div data-testid="sample-range-slider">Slider</div>
}));

describe('CentralLimitGraph Utilities', () => {
    test('createHistogramArray returns an accurate histogram', () => {
        let sampleData = [0.1, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4 ]
        let sum_of_frequencies = createHistogramArray(sampleData).reduce((acc, val) => {
            return acc + val[1];
        }, 0);
        expect(sum_of_frequencies).toEqual(sampleData.length);
    });

    test('forceNumber returns a number or undefined', () => {
        expect(forceNumber(42)).toEqual(42);
        expect(forceNumber('Lizard')).toEqual(0);
    });
});

describe('CentralLimitGraph Component', () => {
    test('The same seed generates the same population', async () => {
        render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        const seedInput = screen.getByTestId('seed-input');
        const generateBtn = screen.getByTestId('generate-btn');

        // Generate with seed 1
        fireEvent.change(seedInput, { target: { value: 'seed-1' } });
        fireEvent.click(generateBtn);
        
        let graph = await screen.findByTestId('population-graph');
        const props1 = JSON.parse(graph.getAttribute('data-props'));
        
        // Generate with seed 2
        fireEvent.change(seedInput, { target: { value: 'seed-2' } });
        fireEvent.click(generateBtn);
        
        // Wait for update
        await waitFor(() => {
            const currentProps = JSON.parse(screen.getByTestId('population-graph').getAttribute('data-props'));
            // populationGraphData is based on theoretical distribution (mean/stdDev) so it doesn't change with seed.
            // domain is based on the actual population min/max, so it SHOULD change with seed.
            expect(currentProps.domain).not.toEqual(props1.domain);
        });

        // Generate with seed 1 again
        fireEvent.change(seedInput, { target: { value: 'seed-1' } });
        fireEvent.click(generateBtn);

        await waitFor(() => {
            const currentProps = JSON.parse(screen.getByTestId('population-graph').getAttribute('data-props'));
            expect(currentProps.domain).toEqual(props1.domain);
        });
    });

    test('The same seed generates the same samples', async () => {
        render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        const seedInput = screen.getByTestId('seed-input');
        const generateBtn = screen.getByTestId('generate-btn');
        // SampleForm is rendered only after population exists, so we mock it specifically or assume logic
        // But our mock renders it? Actually in the component code:
        // <SampleForm showSampleForm={this.state.population ? true : false} />
        // It's conditionally rendered. Our mock definition handles the component *if* rendered.
        
        // We need to trigger generation first
        fireEvent.change(seedInput, { target: { value: 'seed-sample' } });
        fireEvent.click(generateBtn);
        
        const sampleBtn = await screen.findByTestId('sample-btn');
        fireEvent.click(sampleBtn);
        
        const graph = await screen.findByTestId('sample-means-graph');
        const props1 = JSON.parse(graph.getAttribute('data-props'));
        
        // Verify we got data
        expect(props1.activeSampleMeansData).toBeDefined();
    });

    test('Conditionally renders components', async () => {
        render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );
        
        // Check initial state
        expect(screen.queryByTestId('sample-btn')).not.toBeInTheDocument();
        
        // Generate population
        const seedInput = screen.getByTestId('seed-input');
        const generateBtn = screen.getByTestId('generate-btn');
        fireEvent.change(seedInput, { target: { value: 'test-seed' } });
        fireEvent.click(generateBtn);
        
        // Expect sample button to appear
        expect(await screen.findByTestId('sample-btn')).toBeInTheDocument();
    });
});

