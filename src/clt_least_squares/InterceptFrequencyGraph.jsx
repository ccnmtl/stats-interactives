import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE } from './CLTLeastSquares';
import * as math from 'mathjs';
import { BAR_BORDER, BAR_FILL, INDICATOR } from '../colors.js';
math.config({matrix: 'Array'});

const X_MIN = 0;
const X_MAX = 50;
const Y_MIN = -4;
const Y_MAX = 4;

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
            domain={{x: [X_MIN, X_MAX], y: [Y_MIN, Y_MAX]}}>
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
                tickValues={math.range(Y_MIN, Y_MAX, true).map((val) => {
                    return val;
                })} />
            <VictoryAxis
                invertAxis={true}
                label={`Mean Intercept: ${interceptCumalativeMean}`}
                style={{
                    axisLabel: {
                        fontSize: 12,
                        padding: 35,
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
                        strokeWidth: 2 } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[0]}
                    x={(datum) => datum[1]} />
            }
            {samples &&
                <VictoryScatter data={samples.slice(-1)}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: 2 } }}
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
