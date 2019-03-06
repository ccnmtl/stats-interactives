import React from 'react';
import PropTypes from 'prop-types';
import { SMOKING_FREQ} from './data';
import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_BORDER, INDICATOR } from '../colors.js';

export const FrequencyGraphA = (
    {activeDataIdx, handleTaxRateIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            width={700}
            hieght={100}
            style={{
                parent: {
                    height: 'inherit',
                },
            }}
            padding={{left: 40, top: 20, right: 20, bottom: 45}}
            domain={{x: [8, 31]}}>
            <VictoryAxis
                dependentAxis={true}
                label={'Frequency of Smokers'}
                style={{
                    axisLabel: {
                        padding: 30,
                    },
                }}
                tickValues={
                    math.range(1, 8, true)} />
            <VictoryAxis
                label={'Cigarettes Smoked per Day'}
                style={{
                    axisLabel: {
                        padding: 30,
                    },
                }}
                tickValues={math.range(9, 31, true)} />
            {/* 3% graph */}
            { activeDataIdx[0] === 0 &&
                <VictoryScatter
                    data={SMOKING_FREQ[0]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
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
                    size={4}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 5% graph */}
            { activeDataIdx[0] === 1 &&
                <VictoryScatter
                    data={SMOKING_FREQ[1]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(25 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7% graph */}
            { activeDataIdx[0] === 2 &&
                <VictoryScatter
                    data={SMOKING_FREQ[2]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(50 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7.5% graph */}
            { activeDataIdx[0] === 3 &&
                <VictoryScatter
                    data={SMOKING_FREQ[3]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(75 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4}
                    y={(datum) => datum[1]}
                    x={(datum) => Math.floor(datum[0])}/>}
            {/* active data graph */}
            <VictoryScatter
                data={[SMOKING_FREQ[activeDataIdx[0]][activeDataIdx[1]]]}
                style={{ data: { fill: 'blue', stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                y={(datum) => datum[1]}
                x={(datum) => Math.floor(datum[0]) + 0.5}/>
        </VictoryChart>
    );
};

export const FrequencyGraphB = (
    {activeDataIdx, handleTaxRateIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            padding={{left: 10, top: 10, right: 50, bottom: 45}}
            domain={{x: [1, 8]}}>
            <VictoryAxis
                dependentAxis={true}
                orientation={'right'}
                label={'Cigarettes Smoked per Day'}
                style={{
                    axisLabel: {
                        padding: 35,
                    },
                }}
                tickValues={math.range(9, 31, true)} />
            <VictoryAxis
                invertAxis={true}
                label={'Frequency of Smokers'}
                style={{
                    axisLabel: {
                        padding: 30,
                    },
                }}
                tickValues={
                    math.range(1, 8, true)} />
            {/* 3% graph */}
            { activeDataIdx[0] === 0 &&
                <VictoryScatter
                    data={SMOKING_FREQ[0]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
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
                    size={4}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 5% graph */}
            { activeDataIdx[0] === 1 &&
                <VictoryScatter
                    data={SMOKING_FREQ[1]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(25 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7% graph */}
            { activeDataIdx[0] === 2 &&
                <VictoryScatter
                    data={SMOKING_FREQ[2]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(50 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* 7.5% graph */}
            { activeDataIdx[0] === 3 &&
                <VictoryScatter
                    data={SMOKING_FREQ[3]}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        /* eslint-disable-next-line */
                                        handleTaxRateIdx(75 + props.index);
                                    }}
                                ];
                            }
                        }
                    }]}
                    size={4}
                    x={(datum) => datum[1]}
                    y={(datum) => Math.floor(datum[0]) + 0.5}/>}
            {/* active data graph */}
            <VictoryScatter
                data={[SMOKING_FREQ[activeDataIdx[0]][activeDataIdx[1]]]}
                style={{ data: { fill: 'blue', stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
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

