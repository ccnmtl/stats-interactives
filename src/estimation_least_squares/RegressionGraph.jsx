import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryLine,
    VictoryScatter, VictoryArea, VictoryAxis} from 'victory';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);

import { BAR_BORDER, LEAST_SQAURES_EST, DOT_STROKE,
    LEAST_SQAURES_OPT, INDICATOR } from '../colors.js';

const MIN = -5;
const MAX = 5;
const BEST_FIT_OPACITY = 0.5;
const EST_OPACITY = 0.5;

export const RegressionGraph = ({population, regressionFunc,
    bestFitFunc, showBestFit}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Samples and Regression Line'}
            desc={`This graph shows how the sum of square errors changes as
                the slope and estimate of a proposed line is changed. If the
                error increases, the boxes represening the square of the errors
                also increases.`}
            padding={{left: 25, top: 12, right: 15, bottom: 45}}
            domain={{x: [MIN, MAX], y: [MIN, MAX]}}>
            <VictoryAxis
                tickValues={math.range(MIN, MAX, true).map((val) => {
                    return val;
                })} />
            <VictoryAxis
                dependentAxis={true}
                tickValues={math.range(MIN, MAX, true).map((val) => {
                    return val;
                })} />
            {/* squares for best fit line */}
            { population && showBestFit &&
                population.map((val) => {
                    let lineY = bestFitFunc(val[0]);
                    let diffY = math.abs(val[1] - lineY);
                    let isSlopePositive = (
                        bestFitFunc(1) - bestFitFunc(0) >= 0
                    ) ? true : false;

                    if (isSlopePositive) {
                        if (val[1] < lineY) {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_OPT,
                                    fillOpacity: BEST_FIT_OPACITY,
                                }}}
                                data={[{x: val[0], y: lineY, y0: val[1]},
                                    {x: val[0] + diffY,
                                        y: lineY, y0: val[1]}]}/>);
                        } else {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_OPT,
                                    fillOpacity: BEST_FIT_OPACITY,
                                }}}
                                data={[{x: val[0] - diffY,
                                    y: val[1], y0: lineY},
                                {x: val[0], y: val[1], y0: lineY}]}/>);
                        }
                    } else {
                        if (val[1] < lineY) {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_OPT,
                                    fillOpacity: BEST_FIT_OPACITY,
                                }}}
                                data={[{x: val[0] - diffY,
                                    y: val[1], y0: lineY},
                                {x: val[0], y: val[1], y0: lineY}]}/>);
                        } else {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_OPT,
                                    fillOpacity: BEST_FIT_OPACITY,
                                }}}
                                data={[{x: val[0], y: lineY, y0: val[1]},
                                    {x: val[0] + diffY,
                                        y: lineY, y0: val[1]}]}/>);
                        }

                    }
                })
            }
            {/* sqaures for estimated line */}
            {population &&
                population.map((val) => {
                    let lineY = regressionFunc(val[0]);
                    let diffY = math.abs(val[1] - lineY);
                    let isSlopePositive = (
                        regressionFunc(1) - regressionFunc(0) >= 0
                    ) ? true : false;

                    if (isSlopePositive) {
                        if (val[1] < lineY) {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_EST,
                                    fillOpacity: EST_OPACITY,
                                    strokeWidth: 0,
                                }}}
                                data={[{x: val[0], y: lineY, y0: val[1]},
                                    {x: val[0] + diffY,
                                        y: lineY,
                                        y0: val[1]}]}/>);
                        } else {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_EST,
                                    fillOpacity: EST_OPACITY,
                                    strokeWidth: 0,
                                }}}
                                data={[{x: val[0] - diffY,
                                    y: val[1], y0: lineY},
                                {x: val[0], y: val[1], y0: lineY}]}/>);
                        }
                    } else {
                        if (val[1] < lineY) {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_EST,
                                    fillOpacity: EST_OPACITY,
                                    strokeWidth: 0,
                                }}}
                                data={[{x: val[0] - diffY,
                                    y: val[1], y0: lineY},
                                {x: val[0], y: val[1], y0: lineY}]}/>);
                        } else {
                            return (<VictoryArea
                                key={val}
                                style={{data: {
                                    fill: LEAST_SQAURES_EST,
                                    fillOpacity: EST_OPACITY,
                                    strokeWidth: 0,
                                }}}
                                data={[{x: val[0], y: lineY, y0: val[1]},
                                    {x: val[0] + diffY,
                                        y: lineY,
                                        y0: val[1]}]}/>);
                        }

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
                        strokeWidth: DOT_STROKE } }}
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
