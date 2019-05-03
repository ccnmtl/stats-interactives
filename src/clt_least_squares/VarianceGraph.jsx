import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE } from './CLTLeastSquares';
import { BAR_BORDER, BAR_FILL, INDICATOR } from '../colors.js';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const VarianceGraph = ({samples}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Sampling Distribution MSE'}
            desc={`The frequency of mean square errors calculated from
                the regression of each sample of the population.`}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [0, 2], y: [0, 100]}}>
            <VictoryAxis
                dependentAxis={true}
                style={{
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={
                    math.range(0, 100, 10, true).map((val) => {
                        return val;
                    })} />
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
                tickValues={math.range(
                    0, 2, 0.2, true
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

VarianceGraph.propTypes = {
    samples: PropTypes.array,
};


