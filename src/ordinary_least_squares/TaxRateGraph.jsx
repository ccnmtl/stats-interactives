import React from 'react';
import PropTypes from 'prop-types';
import { SMOKING_FREQ } from './data';
import {
    VictoryChart, VictoryTheme,
    VictoryScatter, VictoryAxis} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});
import { BAR_BORDER, INDICATOR } from '../colors.js';

export const TaxRateGraph = ({taxRateIdx, activeTaxRate}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            domain={{x: [2, 8]}}>
            <VictoryAxis
                dependentAxis={true}
                tickValues={[9, 31]} />
            <VictoryAxis
                tickValues={
                    [2, 3, 4, 5, 6, 7, 8]} />
            {/* 3% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[0]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={() => 3}
                y={(datum) => datum[0]}/>
            {/* 5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[1]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={() => 5}
                y={(datum) => datum[0]}/>
            {/* 7% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[2]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={() => 7}
                y={(datum) => datum[0]}/>
            {/* 7.5% graph */}
            <VictoryScatter
                data={SMOKING_FREQ[3]}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={() => 7.5}
                y={(datum) => datum[0]}/>
        </VictoryChart>
    );
};

TaxRateGraph.propTypes = {
    taxRateIdx: PropTypes.number,
    activeTaxRate: PropTypes.number,
};
