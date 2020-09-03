import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE, VARIANCE_FREQ_MIN,
    VARIANCE_FREQ_MAX} from './CLTLeastSquares';
import { BAR_BORDER, BAR_FILL, INDICATOR, DOT_STROKE } from '../colors.js';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);

const Y_MIN = 0;
const Y_MAX = 60;

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const VarianceGraph = ({samples, varianceCumalativeMean}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Sampling Distribution MSE'}
            desc={`The frequency of mean square errors calculated from
                the regression of each sample of the population.`}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [VARIANCE_FREQ_MIN, VARIANCE_FREQ_MAX],
                y: [Y_MIN, Y_MAX]}}>
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
                label={`Mean MSE: ${varianceCumalativeMean}`}
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
                    VARIANCE_FREQ_MIN, VARIANCE_FREQ_MAX, 0.5, true
                ).map((val) => {
                    return math.round(val, 1);
                })} />
            {samples &&
                <VictoryScatter data={samples}
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
            {samples &&
                <VictoryScatter data={samples.slice(-1)}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
        </VictoryChart>
    );
};

VarianceGraph.propTypes = {
    samples: PropTypes.array,
    varianceCumalativeMean: PropTypes.number,
};


