import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE } from './CLTLeastSquares';
import { BAR_BORDER, BAR_FILL, INDICATOR } from '../colors.js';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

const X_MIN = -2;
const X_MAX = 2;
const Y_MIN = 0;
const Y_MAX = 35;

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const SlopeFrequencyGraph = ({samples, sampleIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Sampling Distribution Slope'}
            desc={`The frequency of slope values calculated from
                the regression of each sample of the population.`}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [X_MIN, X_MAX], y: [Y_MIN, Y_MAX]}}>
            <VictoryAxis
                dependentAxis={true}
                style={{
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={
                    math.range(Y_MIN, Y_MAX, 10, true).map((val) => {
                        return val;
                    })} />
            <VictoryAxis
                label={'Regression Slope'}
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
                    X_MIN, X_MAX, 0.5, true
                ).map((val) => {
                    return math.round(val, 1);
                })} />
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

SlopeFrequencyGraph.propTypes = {
    samples: PropTypes.array,
    sampleIdx: PropTypes.number,
};

