import React from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
import { BAR_BORDER, INDICATOR } from '../colors.js';
math.config({matrix: 'Array'});

import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';

export const InterceptFrequencyGraph = ({samples, sampleIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            padding={{left: 50, top: 20, right: 50, bottom: 50}}
            domain={{x: [0, 50], y: [-3, 3]}}>
            <VictoryAxis
                dependentAxis={true}
                orientation={'right'}
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
                tickValues={math.range(-3, 3, true).map((val) => {
                    return val;
                })} />
            <VictoryAxis
                invertAxis={true}
                style={{
                    axisLabel: {
                        fontSize: 12,
                        padding: 35,
                    },
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={math.range(0, 50, 10, true).map((val) => {
                    return val;
                })} />
            {samples &&
                <VictoryScatter data={samples}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: 2 } }}
                    size={5}
                    y={(datum) => datum[0]}
                    x={(datum) => datum[1]} />
            }
        </VictoryChart>
    );
};

InterceptFrequencyGraph.propTypes = {
    samples: PropTypes.array,
    sampleIdx: PropTypes.number,
};
