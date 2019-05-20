import React from 'react';
import PropTypes from 'prop-types';
import { SMOKING_FREQ } from './data';
import {
    VictoryChart, VictoryTheme, VictoryLine,
    VictoryScatter, VictoryAxis} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_BORDER, INDICATOR, INACTIVE, DOT_STROKE } from '../colors.js';

export const TaxRateGraphA = (
    {activeDataIdx, handleTaxRateIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Tax rates and cigarettes smoked each day.'}
            desc={`As tax rates increase, the number of cigarettes
                smoked each day decreases.`}
            padding={{left: 45, top: 10, right: 20, bottom: 50}}
            domain={{x: [8, 31], y: [2, 8]}}>
            <VictoryAxis
                dependentAxis={true}
                label={'Tax Rate (X axis)'}
                style={{
                    axisLabel: {
                        fontSize: '16px',
                        padding: 30,
                    },
                }}
                tickValues={
                    math.range(2, 8, true)} />
            <VictoryAxis
                label={'Cigarettes Smoked per Day (Y axis)'}
                style={{
                    axisLabel: {
                        fontSize: '16px',
                        padding: 30,
                    },
                }}
                tickValues={math.range(9, 31, true).map((val) => {
                    if (val % 2 === 1) {
                        return val;
                    }
                })} />
            {/* 3% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[0]}
                style={{ data: {
                    fill: activeDataIdx[0] === 0 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                y={() => 3}
                x={(datum) => datum[0]}/>
            {/* 5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[1]}
                style={{ data: {
                    fill: activeDataIdx[0] === 1 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                size={4}
                y={() => 5}
                x={(datum) => datum[0]}/>
            {/* 7% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[2]}
                style={{ data: {
                    fill: activeDataIdx[0] === 2 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                size={4}
                y={() => 7}
                x={(datum) => datum[0]}/>
            {/* 7.5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[3]}
                style={{ data: {
                    fill: activeDataIdx[0] === 3 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                size={4}
                y={() => 7.5}
                x={(datum) => datum[0]}/>
            {/* active data graph */}
            <VictoryScatter
                data={[SMOKING_FREQ[activeDataIdx[0]][activeDataIdx[1]]]}
                style={{ data: { fill: 'blue', stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE } }}
                size={4}
                y={(datum) => {
                    switch (activeDataIdx[0]) {
                    case 0:
                        return 3;
                    case 1:
                        return 5;
                    case 2:
                        return 7;
                    case 3:
                        return 7.5;
                    }
                }}
                x={(datum) => datum[0]}/>
            <VictoryLine
                samples={10}
                x={(d) => 29 - 2 * d.y}/>
        </VictoryChart>
    );
};

export const TaxRateGraphB = (
    {activeDataIdx, handleTaxRateIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            title={'Tax rates and cigarettes smoked each day.'}
            desc={`As tax rates increase, the number of cigarettes
                smoked each day decreases.`}
            padding={{left: 50, top: 10, right: 10, bottom: 45}}
            domain={{x: [2, 8]}}>
            <VictoryAxis
                dependentAxis={true}
                label={'Cigarettes Smoked per Day (Y axis)'}
                style={{
                    axisLabel: {
                        padding: 35,
                    },
                }}
                tickValues={math.range(9, 31, true)} />
            <VictoryAxis
                label={'Tax Rate (X axis)'}
                style={{
                    axisLabel: {
                        padding: 30,
                    },
                }}
                tickValues={
                    math.range(2, 8, true)} />
            {/* 3% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[0]}
                style={{ data: {
                    fill: activeDataIdx[0] === 0 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                x={() => 3}
                y={(datum) => datum[0]}/>
            {/* 5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[1]}
                style={{ data: {
                    fill: activeDataIdx[0] === 1 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                size={4}
                x={() => 5}
                y={(datum) => datum[0]}/>
            {/* 7% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[2]}
                style={{ data: {
                    fill: activeDataIdx[0] === 2 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                size={4}
                x={() => 7}
                y={(datum) => datum[0]}/>
            {/* 7.5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[3]}
                style={{ data: {
                    fill: activeDataIdx[0] === 3 ? INDICATOR : INACTIVE,
                    stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE }
                }}
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
                size={4}
                x={() => 7.5}
                y={(datum) => datum[0]}/>
            {/* active data graph */}
            <VictoryScatter
                data={[SMOKING_FREQ[activeDataIdx[0]][activeDataIdx[1]]]}
                style={{ data: { fill: 'blue', stroke: BAR_BORDER,
                    strokeWidth: DOT_STROKE } }}
                size={4}
                x={(datum) => {
                    switch (activeDataIdx[0]) {
                    case 0:
                        return 3;
                    case 1:
                        return 5;
                    case 2:
                        return 7;
                    case 3:
                        return 7.5;
                    }
                }}
                y={(datum) => datum[0]}/>
            <VictoryLine
                samples={10}
                y={(d) => 29 - 2 * d.x}/>
        </VictoryChart>
    );
};

TaxRateGraphA.propTypes = {
    activeDataIdx: PropTypes.array,
    handleTaxRateIdx: PropTypes.func,
};

TaxRateGraphB.propTypes = {
    activeDataIdx: PropTypes.array,
    handleTaxRateIdx: PropTypes.func,
};
