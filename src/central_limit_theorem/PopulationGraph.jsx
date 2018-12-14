import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis } from 'victory';
import { getHistogramMaxima, interpolateHistogram } from '../utils.js';

export const PopulationGraph  = (
    {populationGraphData, samplesGraphData, domain}) => {
    let populationMax = getHistogramMaxima(populationGraphData);
    let samplesMax = samplesGraphData ?
        getHistogramMaxima(samplesGraphData) : null;
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            domain={{x: domain}}
            height={175}>
            <VictoryBar data={populationGraphData}
                x={0}
                y={(datum) => datum[1] / populationMax}/>
            {samplesGraphData &&
                <VictoryScatter data={interpolateHistogram(samplesGraphData)}
                    style={{ data: { fill: 'red' } }}
                    x={0}
                    y={(datum) => (datum[1] / samplesMax) * 0.75}/>
            }
            <VictoryAxis />
        </VictoryChart>
        </>
    );
};

PopulationGraph.propTypes = {
    populationGraphData: PropTypes.array,
    samplesGraphData: PropTypes.array,
    domain: PropTypes.array,
};

