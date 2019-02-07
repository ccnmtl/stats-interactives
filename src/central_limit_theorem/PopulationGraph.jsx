import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis, VictoryLabel } from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { getHistogramMaxima } from '../utils.js';

export const PopulationGraph  = (
    {populationGraphData, samplesGraphData, samplesMax,
        observationIdx, observationData, domain, sampleMean}) => {
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
            <VictoryAxis
                tickValues={math.range(-18, 19)} />
            {populationGraphData &&
                <VictoryBar data={populationGraphData}
                    barWidth={10}
                    barRatio={1}
                    x={0}
                    y={(datum) => datum[1] / populationMax}/> }
            {sampleMean &&
                <VictoryBar data={[{ x: sampleMean, y: 0.05, y0: -0.1 }]}
                    labels={['μ: ' + sampleMean]}
                    barRatio={0.1}
                    labelComponent={<VictoryLabel dy={75} />}
                    style={{ data: { fill: 'green' } }} />
            }
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

