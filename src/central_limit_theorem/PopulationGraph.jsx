import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis, VictoryLegend } from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_FILL, BAR_BORDER, INDICATOR } from '../colors.js';
import { MIN_BIN, MAX_BIN } from './CentralLimitGraph';

export const PopulationGraph  = (
    {populationGraphData, samplesGraphData, samplesMax,
        observationIdx, observationData, domain, sampleMean}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            padding={{top: 0, left: 5, right: 5, bottom: 25}}
            width={850}
            domain={{x: [MIN_BIN, MAX_BIN], y: [0, 1]}}>
            <VictoryAxis
                tickValues={math.range(MIN_BIN, MAX_BIN, true)} />
            <VictoryLegend
                title='Population and Current Sample'
                style={{ title: { fontSize: '28px' },
                    data: { display: 'none' },
                    labels: { display: 'none' }}}/>
            {populationGraphData &&
                <VictoryBar data={populationGraphData}
                    alignment='start'
                    barRatio={1}
                    x={0}
                    y={1}
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: '2px'} }}/> }
            {samplesGraphData &&
                <VictoryScatter data={samplesGraphData}
                    style={{ data: { fill: 'white', stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    size={4}
                    x={(datum) => datum[0] + 0.5}
                    y={(datum) => (datum[1] / samplesMax)}/>
            }
            {observationData &&
                <VictoryScatter data={observationData}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' } }}
                    size={4}
                    x={(datum) => datum[0] + 0.5}
                    y={(datum) => (datum[1] / samplesMax)}/>
            }
        </VictoryChart>
        </>
    );
};

PopulationGraph.propTypes = {
    populationGraphData: PropTypes.array,
    samplesGraphData: PropTypes.array,
    samplesMax: PropTypes.number,
    observationIdx: PropTypes.number,
    observationData: PropTypes.array,
    domain: PropTypes.array,
    sampleMean: PropTypes.number,
};

