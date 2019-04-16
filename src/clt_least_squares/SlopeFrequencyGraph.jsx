import React from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const SlopeFrequencyGraph = ({samples, sampleIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [0, 1], y: [0, 100]}}>
            <VictoryAxis
                dependentAxis={true}
                label={'Intercept Frequency'}
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
                    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
            <VictoryAxis
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
            {samples &&
                <VictoryScatter data={samples}
                    size={7}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
        </VictoryChart>
    );
};

SlopeFrequencyGraph.propTypes = {
    samples: PropTypes.array,
    sampleIdx: PropTypes.number,
};

