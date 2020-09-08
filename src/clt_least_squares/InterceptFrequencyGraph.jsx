import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE, INTERCEPT_FREQ_MIN,
    INTERCEPT_FREQ_MAX } from './CLTLeastSquares';
import { BAR_BORDER, BAR_FILL, INDICATOR, DOT_STROKE } from '../colors.js';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);


const X_MIN = 0;
const X_MAX = 50;

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const InterceptFrequencyGraph = ({samples, interceptCumalativeMean}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Sampling Distribution Intercept'}
            desc={`The frequency of y-intercept values calculated from
                the regression of each sample of the population.`}
            padding={{left: 50, top: 20, right: 50, bottom: 50}}
            domain={{x: [X_MIN, X_MAX],
                y: [INTERCEPT_FREQ_MIN, INTERCEPT_FREQ_MAX]}}>
            <VictoryAxis
                dependentAxis={true}
                orientation={'right'}
                label={'Regression Intercept'}
                style={{
                    axisLabel: {
                        fontSize: 12,
                        padding: 35,
                    },
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={math.range(
                    INTERCEPT_FREQ_MIN, INTERCEPT_FREQ_MAX, true).map((val) => {
                    return val;
                })} />
            <VictoryAxis
                invertAxis={true}
                label={`Mean Intercept: ${interceptCumalativeMean}`}
                style={{
                    axisLabel: {
                        fontSize: 12,
                        padding: 80,
                    },
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={math.range(X_MIN, X_MAX, 10, true).map((val) => {
                    return val;
                })} />
            {samples &&
                <VictoryScatter data={samples}
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[0]}
                    x={(datum) => datum[1]} />
            }
            {samples &&
                <VictoryScatter data={samples.slice(-1)}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[0]}
                    x={(datum) => datum[1]} />
            }
        </VictoryChart>
    );
};

InterceptFrequencyGraph.propTypes = {
    samples: PropTypes.array,
    interceptCumalativeMean: PropTypes.number,
};
