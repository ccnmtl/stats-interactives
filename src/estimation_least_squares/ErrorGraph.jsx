import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryAxis, VictoryTheme, VictoryArea} from 'victory';
import { LEAST_SQAURES_EST, LEAST_SQAURES_OPT } from '../colors.js';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

export const ErrorGraph = ({optimalSize, errorSize,
    showBestFit, estimatedSSEOpacity}) => {
    return (
        <div className={'error-graph-container'}>
            <VictoryChart theme={VictoryTheme.material}
                height={190}
                width={400}
                padding={{left: 40, top: 10, right: 20, bottom: 40}}
                domain={{x: [0, 10], y: [0, 4]}}>
                <VictoryAxis
                    label={'X Axis'}
                    style={{
                        axisLabel: {
                            padding: '160',
                        },
                    }}
                    tickValues={math.range(0, 10, true).map((val) => {
                        return val;
                    })} />
                <VictoryAxis
                    dependentAxis={true}
                    label={'Y Axis'}
                    style={{
                        axisLabel: {
                            padding: '160',
                        },
                    }}
                    tickValues={math.range(0, 4, true).map((val) => {
                        return val;
                    })} />
                <VictoryArea
                    style={{data: {
                        fill: LEAST_SQAURES_EST,
                        fillOpacity: estimatedSSEOpacity }}}
                    data={[{x: 0, y: 4},
                        {x: errorSize, y: 4}]}/>
                {showBestFit &&
                <VictoryArea
                    style={{data: { fill: LEAST_SQAURES_OPT, fillOpacity: 1 }}}
                    data={[{x: 0, y: 4},
                        {x: optimalSize, y: 4}]}/>
                }
            </VictoryChart>
        </div>
    );
};

ErrorGraph.propTypes = {
    optimalSize: PropTypes.number,
    errorSize: PropTypes.number,
    showBestFit: PropTypes.bool,
    estimatedSSEOpacity: PropTypes.number,
};
