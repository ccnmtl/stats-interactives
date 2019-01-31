import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryScatter, VictoryAxis } from 'victory';
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
            domain={{x: domain}}>
            {populationGraphData &&
                <VictoryBar data={populationGraphData}
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
            <VictoryAxis />
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

