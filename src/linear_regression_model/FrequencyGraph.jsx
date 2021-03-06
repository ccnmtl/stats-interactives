import React from 'react';
import PropTypes from 'prop-types';
import { SMOKING_FREQ, THREE_PCT_DIST, FIVE_PCT_DIST,
    SEVEN_PCT_DIST, SEVENFIVE_PCT_DIST } from './data';
import {
    VictoryChart, VictoryTheme, VictoryLine,
    VictoryScatter, VictoryAxis} from 'victory';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);

import { BAR_BORDER, INDICATOR, DOT_STROKE } from '../colors.js';

export const FrequencyGraphA = (
    {activeDataIdx, handleTaxRateIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={`The frequency of smokers who smoke a given
                number of cigarettes per day.`}
            desc={`As tax rates increase, the frequency of the number of
                cigarettes smoked each day decreases.`}
            width={603}
            height={318}
            padding={{left: 74, top: 20, right: 20, bottom: 65}}
            domain={{x: [8, 31]}}>
            <VictoryAxis
                dependentAxis={true}
                label={'Freq. of Smokers (X axis)'}
                style={{
                    axisLabel: {
                        fontSize: 24,
                        padding: 40,
                    },
                    tickLabels: {
                        fontSize: 22,
                    }
                }}
                tickValues={
                    math.range(1, 8, true)} />
            <VictoryAxis
                label={'Cigarettes Smoked per Day (Y axis)'}
                style={{
                    axisLabel: {
                        fontSize: 24,
                        padding: 40,
                    },
                    tickLabels: {
                        fontSize: 22,
                    }
                }}
                tickValues={math.range(9, 31, true).map((val) => {
                    if (val % 2 === 1) {
                        return val;
                    }
                })} />
            {/* 3% graph */}
            { activeDataIdx[0] === 0 &&
                <VictoryLine
                    data={THREE_PCT_DIST[0]}
                    interpolation={'monotoneX'}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 0 &&
                <VictoryScatter
                    data={SMOKING_FREQ[0]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={7}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 5% graph */}
            { activeDataIdx[0] === 1 &&
                <VictoryLine
                    data={FIVE_PCT_DIST[0]}
                    interpolation={'monotoneX'}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 1 &&
                <VictoryScatter
                    data={SMOKING_FREQ[1]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(20 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={7}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7% graph */}
            { activeDataIdx[0] === 2 &&
                <VictoryLine
                    data={SEVEN_PCT_DIST[0]}
                    interpolation={'monotoneX'}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 2 &&
                <VictoryScatter
                    data={SMOKING_FREQ[2]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(40 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={7}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7.5% graph */}
            { activeDataIdx[0] === 3 &&
                <VictoryLine
                    data={SEVENFIVE_PCT_DIST[0]}
                    interpolation={'monotoneX'}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 3 &&
                <VictoryScatter
                    data={SMOKING_FREQ[3]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(60 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={7}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* active data graph */}
            <VictoryScatter
                data={[SMOKING_FREQ[activeDataIdx[0]][activeDataIdx[1]]]}
                style={{ data: { fill: 'blue', stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE } }}
                size={7}
                y={(datum) => datum[1]}
                x={(datum) => Math.floor(datum[0]) + 0.5}/>
        </VictoryChart>
    );
};

// Note: in the padding prop below, the left and right values
// need to be equal, or strange things happen to the graph
export const FrequencyGraphB = (
    {activeDataIdx, handleTaxRateIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={`The frequency of smokers who smoke a given
                number of cigarettes per day.`}
            desc={`As tax rates increase, the frequency of the number of
                cigarettes smoked each day decreases.`}
            width={220}
            height={413}
            padding={{left: 50, top: 15, right: 50, bottom: 50}}
            domain={{x: [1, 8]}}>
            <VictoryAxis
                dependentAxis={true}
                orientation={'right'}
                label={'Cigarettes Smoked per Day (Y axis)'}
                style={{
                    axisLabel: {
                        padding: 35,
                        fontSize: 14,
                    },
                    tickLabels: {
                        fontSize: 15,
                    },
                }}
                tickValues={math.range(9, 31, true)} />
            <VictoryAxis
                invertAxis={true}
                label={'Frequency of Smokers (X axis)'}
                style={{
                    axisLabel: {
                        padding: 30,
                        fontSize: 14,
                    },
                    tickLabels: {
                        fontSize: 15,
                    },
                }}
                tickValues={
                    math.range(1, 8, true)} />
            {/* 3% graph */}
            { activeDataIdx[0] === 0 &&
                <VictoryLine
                    data={THREE_PCT_DIST[1]}
                    interpolation={'monotoneX'}
                    sortKey={1}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 0 &&
                <VictoryScatter
                    data={SMOKING_FREQ[0]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4.5}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 5% graph */}
            { activeDataIdx[0] === 1 &&
                <VictoryLine
                    data={FIVE_PCT_DIST[1]}
                    interpolation={'monotoneX'}
                    sortKey={1}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 1 &&
                <VictoryScatter
                    data={SMOKING_FREQ[1]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(20 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4.5}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7% graph */}
            { activeDataIdx[0] === 2 &&
                <VictoryLine
                    data={SEVEN_PCT_DIST[1]}
                    interpolation={'monotoneX'}
                    sortKey={1}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 2 &&
                <VictoryScatter
                    data={SMOKING_FREQ[2]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(40 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4.5}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7.5% graph */}
            { activeDataIdx[0] === 3 &&
                <VictoryLine
                    data={SEVENFIVE_PCT_DIST[1]}
                    interpolation={'monotoneX'}
                    sortKey={1}
                    x={0}
                    y={1}/>
            }
            { activeDataIdx[0] === 3 &&
                <VictoryScatter
                    data={SMOKING_FREQ[3]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(60 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4.5}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* active data graph */}
            <VictoryScatter
                data={[SMOKING_FREQ[activeDataIdx[0]][activeDataIdx[1]]]}
                style={{ data: { fill: 'blue', stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE } }}
                size={4}
                x={(datum) => datum[1]}
                y={(datum) => Math.floor(datum[0]) + 0.5}/>
        </VictoryChart>
    );
};

FrequencyGraphA.propTypes = {
    activeDataIdx: PropTypes.array,
    handleTaxRateIdx: PropTypes.func,
};

FrequencyGraphB.propTypes = {
    activeDataIdx: PropTypes.array,
    handleTaxRateIdx: PropTypes.func,
};
