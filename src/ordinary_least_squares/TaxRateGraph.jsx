import React from 'react';
import PropTypes from 'prop-types';
import { THREE_PCT, FIVE_PCT, SEVEN_PCT,
    SEVEN_FIVE_PCT } from './data';
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
            <VictoryScatter
                data={THREE_PCT}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={0}
                y={1}/>
            <VictoryScatter
                data={FIVE_PCT}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={0}
                y={1}/>
            <VictoryScatter
                data={SEVEN_PCT}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={0}
                y={1}/>
            <VictoryScatter
                data={SEVEN_FIVE_PCT}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={0}
                y={1}/>
        </VictoryChart>
    );
};

TaxRateGraph.propTypes = {
    taxRateIdx: PropTypes.number,
    activeTaxRate: PropTypes.number,
};
