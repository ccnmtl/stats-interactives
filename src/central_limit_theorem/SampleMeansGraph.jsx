import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryAxis,
    VictoryScatter} from 'victory';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);

import { MIN_BIN, MAX_BIN } from './CentralLimitGraph';
import { BAR_FILL, BAR_BORDER, INDICATOR, DOT_STROKE } from '../colors.js';

export const SampleMeansGraph = ({
    sampleMeansGraphData, domain, range, popMean, activeSampleMeansData}) => {

    return (
        <>
            <VictoryChart theme={VictoryTheme.material}
                title={'Distribution of Sample Means'}
                desc={`As the number of samples increases, the mean of the
                    samples form a normal distribution centered on the
                    population mean.`}
                padding={{top: 0, left: 10, right: 10, bottom: 25}}
                width={850}
                height={350}
                style={{
                    parent: {
                        height: 'inherit',
                        padding: '0.5em 1em 1em 1em',
                    }
                }}
                domain={{x: [MIN_BIN, MAX_BIN], y: range}}>
                <VictoryAxis
                    tickValues={math.range(MIN_BIN, MAX_BIN, true)} />
                {sampleMeansGraphData &&
                <VictoryScatter data={sampleMeansGraphData}
                    size={4}
                    x={0}
                    y={1}
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: DOT_STROKE} }}/>
                }
                {activeSampleMeansData &&
                    <VictoryScatter data={activeSampleMeansData}
                        size={4}
                        style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                            strokeWidth: DOT_STROKE }, labels: {
                            fontSize: '24', fontColor: '#000000' } }}/>
                }
            </VictoryChart>
        </>
    );
};

SampleMeansGraph.propTypes = {
    domain: PropTypes.array,
    range: PropTypes.array,
    sampleMeansGraphData: PropTypes.array,
    popMean: PropTypes.number,
    activeSampleMeansData: PropTypes.array,
};
