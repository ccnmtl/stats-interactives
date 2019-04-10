import React from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const PopulationGraph = ({population, sampleIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [0, 1], y: [0, 1]}}>
            <VictoryAxis
                dependentAxis={true}
                label={'The Y axis'}
                style={{
                    axisLabel: {
                        fontSize: 12,
                        padding: 35,
                    },
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={
                    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]} />
            <VictoryAxis
                label={'The X axis'}
                style={{
                    axisLabel: {
                        fontSize: 12,
                        padding: 35,
                    },
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={
                    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]} />
            {population &&
                <VictoryScatter data={population[sampleIdx]}
                    size={7}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
        </VictoryChart>
    );
};

PopulationGraph.propTypes = {
    population: PropTypes.array,
    sampleIdx: PropTypes.number,
};
