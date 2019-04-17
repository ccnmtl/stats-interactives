import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryLine, VictoryVoronoiContainer,
    VictoryScatter, VictoryArea, VictoryAxis} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_BORDER, LEAST_SQAURES_EST,
    LEAST_SQAURES_OPT, INDICATOR } from '../colors.js';

const MIN = -5;
const MAX = 5;

export const RegressionGraph = ({population, regressionFunc,
    bestFitFunc, showBestFit}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer/>}
            padding={{left: 40, top: 20, right: 15, bottom: 45}}
            domain={{x: [MIN, MAX], y: [MIN, MAX]}}>
            <VictoryAxis
                label={'X Axis'}
                style={{
                    axisLabel: {
                        padding: '160',
                    },
                }}
                tickValues={math.range(MIN, MAX, true).map((val) => {
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
                tickValues={math.range(MIN, MAX, true).map((val) => {
                    return val;
                })} />
            {/* sqaures for estimated line */}
            {population &&
                population.map((val) => {
                    let lineY = regressionFunc(val[0]);
                    let diffY = math.abs(val[1] - lineY);
                    // Assumes slope is positive
                    if (val[1] < lineY) {
                        return (<VictoryArea
                            key={val}
                            style={{data: {
                                fill: LEAST_SQAURES_EST, fillOpacity: 0.5 }}}
                            data={[{x: val[0], y: lineY, y0: val[1]},
                                {x: val[0] + diffY, y: lineY, y0: val[1]}]}/>);
                    } else {
                        return (<VictoryArea
                            key={val}
                            style={{data: {
                                fill: LEAST_SQAURES_EST, fillOpacity: 0.5 }}}
                            data={[{x: val[0] - diffY, y: val[1], y0: lineY},
                                {x: val[0], y: val[1], y0: lineY}]}/>);
                    }
                })
            }
            {/* squares for best fit line */}
            { population && showBestFit &&
                population.map((val) => {
                    let lineY = bestFitFunc(val[0]);
                    let diffY = math.abs(val[1] - lineY);
                    // Assumes slope is positive
                    if (val[1] < lineY) {
                        return (<VictoryArea
                            key={val}
                            style={{data: {
                                fill: LEAST_SQAURES_OPT, fillOpacity: 0.5 }}}
                            data={[{x: val[0], y: lineY, y0: val[1]},
                                {x: val[0] + diffY, y: lineY, y0: val[1]}]}/>);
                    } else {
                        return (<VictoryArea
                            key={val}
                            style={{data: {
                                fill: LEAST_SQAURES_OPT, fillOpacity: 0.5 }}}
                            data={[{x: val[0] - diffY, y: val[1], y0: lineY},
                                {x: val[0], y: val[1], y0: lineY}]}/>);
                    }
                })
            }
            { population &&
                <VictoryLine
                    samples={10}
                    style={{ data: { stroke: LEAST_SQAURES_EST,
                        strokeWidth: '1px' } }}
                    y={(datum) => regressionFunc(datum.x)}/>
            }
            { population && showBestFit &&
                <VictoryLine
                    samples={10}
                    style={{ data: { stroke: LEAST_SQAURES_OPT,
                        strokeWidth: '1px' } }}
                    y={(datum) => bestFitFunc(datum.x)}/>
            }
            { population &&
                <VictoryScatter
                    data={population}
                    style={{ data: {
                        fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    size={4}
                    x={(datum) => datum[0]}
                    y={(datum) => datum[1]} />
            }
        </VictoryChart>
    );
};

RegressionGraph.propTypes = {
    population: PropTypes.array,
    regressionFunc: PropTypes.func,
    bestFitFunc: PropTypes.func,
    showBestFit: PropTypes.bool,
};
