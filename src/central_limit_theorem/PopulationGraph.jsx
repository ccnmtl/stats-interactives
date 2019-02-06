import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis } from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { getHistogramMaxima } from '../utils.js';

export const PopulationGraph  = (
    {populationGraphData, samplesGraphData, samplesMax,
        observationIdx, observationData, domain}) => {
    let populationMax = 0;
    if (populationGraphData) {
        populationMax = getHistogramMaxima(populationGraphData);
    }
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            padding={{top: 0, left: 5, right: 5, bottom: 25}}
            width={850}
            domain={{x: [-18, 18]}}>
            {populationGraphData &&
                <VictoryBar data={populationGraphData}
                    barWidth={10}
                    barRatio={1}
                    x={0}
                    y={(datum) => datum[1] / populationMax}/> }
            {samplesGraphData &&
                <VictoryScatter data={samplesGraphData}
                    style={{ data: { fill: 'red' } }}
                    x={0}
                    y={(datum) => (datum[1] / samplesMax)}/>
            }
            {observationData &&
                <VictoryScatter data={observationData}
                    style={{ data: { fill: 'blue' } }}
                    x={0}
                    y={(datum) => (datum[1] / samplesMax)}/>
            }
            <VictoryAxis
                tickValues={math.range(-18, 19)} />
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
};

