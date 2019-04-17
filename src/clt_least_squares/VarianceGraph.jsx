import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE } from './CLTLeastSquares';
import { BAR_BORDER, BAR_FILL, INDICATOR } from '../colors.js';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const VarianceGraph = ({samples, sampleIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [0, 1], y: [0, 100]}}>
            <VictoryAxis
                dependentAxis={true}
                style={{
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={
                    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
            <VictoryAxis
                label={'Regression MSE'}
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
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: 2 } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
            {samples &&
                <VictoryScatter data={samples.slice(-1)}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: 2 } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
        </VictoryChart>
    );
};

VarianceGraph.propTypes = {
    samples: PropTypes.array,
    sampleIdx: PropTypes.number,
};


