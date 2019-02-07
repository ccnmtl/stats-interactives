import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryAxis } from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

export const SampleMeansGraph = ({sampleMeansGraphData, domain, range}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            padding={{top: 0, left: 5, right: 5, bottom: 25}}
            width={850}
            domain={{x: [-18, 18], y: range}}>
            { sampleMeansGraphData &&
                <VictoryBar data={sampleMeansGraphData}
                    barRatio={0.2}
                    x={0}
                    y={1}/>
            }
            <VictoryAxis
                tickValues={math.range(-18, 19)} />
        </VictoryChart>
        </>
    );
};

SampleMeansGraph.propTypes = {
    domain: PropTypes.array,
    range: PropTypes.array,
    sampleMeansGraphData: PropTypes.array,
};
