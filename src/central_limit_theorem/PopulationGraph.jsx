import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_FILL, BAR_BORDER, INDICATOR, DOT_STROKE } from '../colors.js';
import { MIN_BIN, MAX_BIN } from './CentralLimitGraph';

export const PopulationGraph  = (
    {populationGraphData, samplesGraphData, samplesMax,
        observationIdx, domain, sampleMean, distType}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            title={'Population and Current Sample'}
            desc={`The population is a ${distType} distribution. The
                distribution of samples largely follows
                that of the population.`}
            padding={{top: 0, left: 10, right: 10, bottom: 25}}
            width={850}
            height={350}
            style={{
                parent: {
                    height: 'inherit',
                    padding: '0.5em 1em 1em 1em',
                }
            }}
            domain={{x: [MIN_BIN, MAX_BIN], y: [0, 1]}}>
            <VictoryAxis
                tickValues={math.range(MIN_BIN, MAX_BIN, true)} />
            {populationGraphData &&
                <VictoryBar data={populationGraphData}
                    alignment='start'
                    barRatio={1}
                    x={0}
                    y={1}
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: '2px'} }}/> }
            {samplesGraphData &&
                <VictoryScatter data={samplesGraphData.slice(0, observationIdx)}
                    style={{ data: { fill: 'white', stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
                    size={4}
                    x={(datum) => datum[0] + 0.5}
                    y={(datum) => (datum[1] / samplesMax)}/>
            }
            {samplesGraphData &&
                    <VictoryScatter data={
                        samplesGraphData.slice(
                            observationIdx - 1, observationIdx)}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE } }}
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
    distType: PropTypes.string,
};

