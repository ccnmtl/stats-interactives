import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryAxis,
    VictoryScatter, VictoryLabel, VictoryLegend } from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { MIN_BIN, MAX_BIN } from './CentralLimitGraph';
import { BAR_FILL, BAR_BORDER, INDICATOR } from '../colors.js';

export const SampleMeansGraph = ({
    sampleMeansGraphData, domain, range, popMean}) => {
    let sampleMeanVector = [];
    let sampleMean = null;

    if (sampleMeansGraphData && sampleMeansGraphData.length > 0) {
        let currSM = sampleMeansGraphData.pop();

        if (currSM === null || currSM.length < 3) {
            return;
        }

        sampleMean = currSM[2];
        sampleMeanVector = [{
            x: currSM[0],
            y: currSM[1],
        }];
    }

    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            padding={{top: 0, left: 5, right: 5, bottom: 25}}
            width={850}
            domain={{x: [MIN_BIN, MAX_BIN], y: range}}>
            <VictoryAxis
                tickValues={math.range(MIN_BIN, MAX_BIN, true)} />
            <VictoryLegend
                title='Distribution of Sample Means'
                style={{ title: { fontSize: '28px' },
                    data: { display: 'none' },
                    labels: { display: 'none' }}}/>
            {sampleMeansGraphData &&
                <VictoryScatter data={sampleMeansGraphData}
                    x={0}
                    y={1}
                    style={{ data: { fill: BAR_FILL, stroke: BAR_BORDER,
                        strokeWidth: '2px'} }}/>
            }
            {sampleMeanVector &&
                <VictoryScatter data={sampleMeanVector}
                    size={4}
                    labels={['x̄: ' + sampleMean]}
                    labelComponent={
                        // shift the label L/R depending on
                        // if its gt/lt the pop mean
                        <VictoryLabel
                            dx={() => sampleMean > popMean ? 30 : -25 } />}
                    style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                        strokeWidth: '1px' }, labels: {
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
};
