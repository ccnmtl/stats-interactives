import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryAxis, VictoryTheme, VictoryArea} from 'victory';
import { LEAST_SQAURES_EST, LEAST_SQAURES_OPT } from '../colors.js';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);

export const ErrorGraph = ({optimalSize, errorSize,
    showBestFit, estimatedSSEOpacity, estimatedSSE, optimalSSE}) => {
    return (
        <>
            <div className={'error-graph-container'}>
                <VictoryChart theme={VictoryTheme.material}
                    title={'Sum of Residuals Squared'}
                    desc={`This graphs shows the total area for all
                        of the sum of residuals squared.`}
                    height={400}
                    width={190}
                    padding={{left: 30, top: 12, right: 5, bottom: 30}}
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
                        style={{data: {
                            fill: LEAST_SQAURES_OPT, fillOpacity: 1 }}}
                        data={[{x: 0, y: optimalSize},
                            {x: 4, y: optimalSize}]}/>
                    }
                </VictoryChart>
            </div>
            {estimatedSSE &&
            <div className={'sse-label'}>
                Estimated SSE: {math.round(estimatedSSE, 2)}
            </div>}
            {showBestFit &&
            <div className={'sse-label best-fit-label'}>
                Best Fit SSE: {math.round(optimalSSE, 2)}
            </div>}
        </>
    );
};

ErrorGraph.propTypes = {
    optimalSize: PropTypes.number,
    errorSize: PropTypes.number,
    showBestFit: PropTypes.bool,
    estimatedSSEOpacity: PropTypes.number,
    estimatedSSE: PropTypes.number,
    optimalSSE: PropTypes.number,
};
