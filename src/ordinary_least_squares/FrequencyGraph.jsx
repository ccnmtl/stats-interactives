import React from 'react';
import PropTypes from 'prop-types';
import { SMOKING_FREQ} from './data';
import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_BORDER, INDICATOR } from '../colors.js';

export const FrequencyGraph = ({taxRateIdx, activeTaxRate}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            domain={{x: [1, 8]}}>
            <VictoryAxis
                invertAxis={true}
                tickValues={
                    [1, 2, 3, 4, 5, 6, 7, 8]} />
            <VictoryAxis
                dependentAxis={true}
                orientation={'right'}
                tickValues={[9, 31]} />
            {/* 3% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[0]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={(datum) => datum[1]}
                y={(datum) => Math.floor(datum[0])}/>
            {/* 5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[1]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={(datum) => datum[1]}
                y={(datum) => Math.floor(datum[0])}/>
            {/* 7% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[2]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={(datum) => datum[1]}
                y={(datum) => Math.floor(datum[0])}/>
            {/* 7.5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[3]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={(datum) => datum[1]}
                y={(datum) => Math.floor(datum[0])}/>
        </VictoryChart>
    );
};

FrequencyGraph.propTypes = {
    taxRateIdx: PropTypes.number,
    activeTaxRate: PropTypes.number,
};

