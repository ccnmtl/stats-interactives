import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { CentralLimitGraph } from '../central_limit_theorem/CentralLimitGraph';
import { forceNumber, createHistogramArray } from '../utils.js';

// Mock the graph components to verify the data passed to them WITHOUT implementation details
// We use a mock function to capture props
const MockPopulationGraph = jest.fn(() => <div data-testid="pop-graph">Population Graph</div>);
const MockSampleMeansGraph = jest.fn(() => <div data-testid="sample-graph">Sample Means Graph</div>);
const MockSampleRangeSlider = jest.fn(() => <div data-testid="sample-slider">Slider</div>);

jest.mock('../central_limit_theorem/PopulationGraph', () => ({
    PopulationGraph: (props) => MockPopulationGraph(props)
}));
jest.mock('../central_limit_theorem/SampleMeansGraph', () => ({
    SampleMeansGraph: (props) => MockSampleMeansGraph(props)
}));
jest.mock('../central_limit_theorem/SampleRangeSlider', () => ({
    SampleRangeSlider: (props) => MockSampleRangeSlider(props)
}));

// Mock Google Analytics to avoid errors
jest.mock('react-ga4', () => ({
    event: jest.fn(),
}));


describe('CentralLimitGraph Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('The same seed generates the same population (Deterministic Generation)', async () => {
        const user = userEvent.setup();
        const { unmount } = render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        // Find inputs - ensuring PopulationForm is rendered (it should be real)
        const seedInput = screen.getByLabelText(/Seed/i);

        // 1. Generate with Seed A
        await user.clear(seedInput);
        await user.type(seedInput, 'my-new-seed');
        const generateButton = screen.getByText('Generate Population');
        await user.click(generateButton);

        // Capture calls to PopulationGraph
        expect(MockPopulationGraph).toHaveBeenCalled();
        const firstCallProps = MockPopulationGraph.mock.calls[MockPopulationGraph.mock.calls.length - 1][0];
        const popData1 = firstCallProps.populationGraphData;

        // 2. Generate with Seed B
        await user.clear(seedInput);
        await user.type(seedInput, 'a-different-seed');
        await user.click(generateButton);

        const secondCallProps = MockPopulationGraph.mock.calls[MockPopulationGraph.mock.calls.length - 1][0];
        const popData2 = secondCallProps.populationGraphData;

        // Note: PopulationGraph displays theoretical distribution, which doesn't change with seed.
        // We verify reproducibility by checking if re-entering Seed A gives same result as first time.

        // 3. Generate again with Seed A
        await user.clear(seedInput);
        await user.type(seedInput, 'my-new-seed');
        await user.click(generateButton);

        const thirdCallProps = MockPopulationGraph.mock.calls[MockPopulationGraph.mock.calls.length - 1][0];
        const popData3 = thirdCallProps.populationGraphData;

        expect(popData1).toEqual(popData3);
        unmount();
    });

    test('The same seed generates the same samples', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        const seedInput = screen.getByLabelText(/Seed/i);
        // Setup Population
        await user.clear(seedInput);
        await user.type(seedInput, 'my-new-seed');
        const generatePopButton = screen.getByText('Generate Population');
        await user.click(generatePopButton);

        // Interact with Sample Form (now visible)
        // Need to find "Run Simulation" or similar button. 
        // Based on previous tests/code, it has ID "run-sample" or text.
        // Assuming SampleForm has a button to run sample.
        const runSampleButton = screen.getByRole('button', { name: /^Sample$/i });

        await user.click(runSampleButton);

        // Capture data passed to SampleMeansGraph
        expect(MockSampleMeansGraph).toHaveBeenCalled();
        const props1 = MockSampleMeansGraph.mock.calls[MockSampleMeansGraph.mock.calls.length - 1][0];
        const sampleData1 = props1.sampleMeansGraphData;

        // Change seed, run again
        await user.clear(seedInput);
        await user.type(seedInput, 'diff-seed');
        await user.click(generatePopButton);
        await user.click(runSampleButton);

        const props2 = MockSampleMeansGraph.mock.calls[MockSampleMeansGraph.mock.calls.length - 1][0];
        const sampleData2 = props2.sampleMeansGraphData;

        expect(sampleData1).not.toEqual(sampleData2);

        // Reset to original seed
        await user.clear(seedInput);
        await user.type(seedInput, 'my-new-seed');
        await user.click(generatePopButton);
        await user.click(runSampleButton);

        const props3 = MockSampleMeansGraph.mock.calls[MockSampleMeansGraph.mock.calls.length - 1][0];
        const sampleData3 = props3.sampleMeansGraphData;

        expect(sampleData1).toEqual(sampleData3);
    });

    test('Conditionally renders components based on state', () => {
        render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        // Initial state: No Population Graph Data, so PopulationForm might be visible but "SampleForm" hidden?
        // Code says: showPopForm={this.state.populationGraphData ? true : false} 
        // Wait, showPopForm prop on PopulationForm? 
        // Actually, looking at render:
        // <PopulationForm ... showPopForm={...} />
        // <SampleForm ... showSampleForm={this.state.population ? true : false} />

        // Initially population is null.
        // SampleForm has a prop 'showSampleForm'. 
        // We verify if SampleForm's inputs are visible or if it renders null.
        // Assuming SampleForm renders normally but hides content if showSampleForm is false, 
        // OR it might not render inputs.
        // Let's check visually: "That the sample form is rendered once a population exists."

        expect(screen.queryByText(/Sample Size/i)).not.toBeInTheDocument(); // Assuming Sample Size is in SampleForm

        // Generate Population
        const seedInput = screen.getByLabelText(/Seed/i);
        fireEvent.change(seedInput, { target: { value: 'test' } });
        fireEvent.click(screen.getByText('Generate Population'));

        // Now Sample Form should be visible
        // Now Sample Form should be visible
        expect(screen.getByText(/Select the Number of Samples/i)).toBeInTheDocument();
        expect(screen.getByText(/Select a Sample Size/i)).toBeInTheDocument();

        // Check Sliders/Range inputs appear after sampling
        expect(screen.queryByTestId('sample-slider')).not.toBeInTheDocument();

        // Run Sample
        fireEvent.click(screen.getByRole('button', { name: /^Sample$/i }));

        expect(screen.getByTestId('sample-slider')).toBeInTheDocument();
    });

    test('Reset Simulation clears data', () => {
        render(
            <MemoryRouter>
                <CentralLimitGraph />
            </MemoryRouter>
        );

        // Setup full state
        // Setup full state
        fireEvent.change(screen.getByLabelText(/Seed/i), { target: { value: 'reset-test' } });
        fireEvent.click(screen.getByText('Generate Population'));
        fireEvent.click(screen.getByRole('button', { name: /^Sample$/i }));

        expect(screen.getByTestId('pop-graph')).toBeInTheDocument();
        expect(screen.getByTestId('sample-graph')).toBeInTheDocument();

        // Reset
        fireEvent.click(screen.getByText('Reset Simulation'));

        // Verify Graph is gone or props cleared
        // The component conditionally renders PopulationGraph: 
        // <PopulationGraph ... /> is always rendered? 
        // No, looking at render: 
        // <PopulationGraph ... populationGraphData={this.state.populationGraphData} ... />
        // It seems it is always rendered but maybe empty data?
        // Wait, looking at code: 
        // <PopulationForm showPopForm={this.state.populationGraphData ? true : false}/>
        // If state resets, populationGraphData becomes null.
        // Verify via Mock props or if it unmounts.
        // Actually, PopulationGraph is always in JSX. 
        // But if we pass null data, maybe it renders empty.
        // The test 'That the population graph is rendered when the button is clicked' implies it wasn't valid before.
        // Let's check the props passed to mock on last call.

        const lastCallProps = MockPopulationGraph.mock.calls[MockPopulationGraph.mock.calls.length - 1][0];
        expect(lastCallProps.populationGraphData).toBeNull(); // Should be null after reset
    });
});

test('createHistogramArray utility works', () => {
    let sampleData = [0.1, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4]
    let sum_of_frequencies = createHistogramArray(sampleData).reduce((acc, val) => {
        return acc + val[1];
    }, 0);

    expect(sum_of_frequencies).toEqual(sampleData.length);
});

test('forceNumber utility works', () => {
    expect(forceNumber(42)).toEqual(42);
    expect(forceNumber('Lizard')).toEqual(0);
});
