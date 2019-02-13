import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryAxis } from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { MIN_BIN, MAX_BIN } from './CentralLimitGraph';

export const SampleMeansGraph = ({sampleMeansGraphData, domain, range}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            padding={{top: 0, left: 5, right: 5, bottom: 25}}
            width={850}
            domain={{x: [MIN_BIN, MAX_BIN], y: range}}>
            <VictoryAxis
                tickValues={math.range(MIN_BIN, MAX_BIN, true)} />
            { sampleMeansGraphData &&
                <VictoryBar data={sampleMeansGraphData}
                    alignment='start'
                    barRatio={1}
                    x={0}
                    y={1}/>
            }
        </VictoryChart>
        </>
    );
};

SampleMeansGraph.propTypes = {
    domain: PropTypes.array,
    range: PropTypes.array,
    sampleMeansGraphData: PropTypes.array,
};
