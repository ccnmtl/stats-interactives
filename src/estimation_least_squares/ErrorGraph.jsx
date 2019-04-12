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
                height={400}
                width={190}
                padding={{left: 30, top: 25, right: 5, bottom: 30}}
                domain={{x: [0, 4], y: [0, 10]}}>
                <VictoryAxis
                    tickValues={math.range(0, 4, true).map((val) => {
                        return val;
                    })} />
                <VictoryAxis
                    dependentAxis={true}
                    tickValues={math.range(0, 10, true).map((val) => {
                        return val;
                    })} />
                {errorSize &&
                <VictoryArea
                    style={{data: {
                        fill: LEAST_SQAURES_EST,
                        fillOpacity: estimatedSSEOpacity }}}
                    data={[{x: 0, y: errorSize},
                        {x: 4, y: errorSize}]}/>
                }
                {showBestFit &&
                <VictoryArea
                    style={{data: { fill: LEAST_SQAURES_OPT, fillOpacity: 1 }}}
                    data={[{x: 0, y: optimalSize},
                        {x: 4, y: optimalSize}]}/>
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
