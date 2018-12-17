import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryAxis } from 'victory';

export const SampleMeansGraph = ({sampleMeansGraphData, domain, range}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            padding={{top: 0, left: 0, right: 0, bottom: 25}}
            domain={{x: domain, y: range}}>
            { sampleMeansGraphData &&
                <VictoryBar data={sampleMeansGraphData}
                    x={0}
                    y={1}/>
            }
            <VictoryAxis />
        </VictoryChart>
        </>
    );
};

SampleMeansGraph.propTypes = {
    domain: PropTypes.array,
    range: PropTypes.array,
    sampleMeansGraphData: PropTypes.array,
};
