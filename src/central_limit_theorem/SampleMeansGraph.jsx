import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryChart, VictoryTheme, VictoryBar,
    VictoryAxis } from 'victory';

export const SampleMeansGraph = ({sampleMeansGraphData, domain, range}) => {
    return (
        <>
        <VictoryChart theme={VictoryTheme.material}
            domain={{x: domain, y: range}}
            height={200}>
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
