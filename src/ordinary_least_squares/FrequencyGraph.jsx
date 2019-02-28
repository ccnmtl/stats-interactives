import React from 'react';
import PropTypes from 'prop-types';
import { THREE_PCT_SCATTER, FIVE_PCT_SCATTER, SEVEN_PCT_SCATTER,
    SEVEN_FIVE_PCT_SCATTER } from './data';
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
            <VictoryScatter
                data={THREE_PCT_SCATTER}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={1}
                y={0}/>
            <VictoryScatter
                data={FIVE_PCT_SCATTER}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={1}
                y={0}/>
            <VictoryScatter
                data={SEVEN_PCT_SCATTER}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={1}
                y={0}/>
            <VictoryScatter
                data={SEVEN_FIVE_PCT_SCATTER}
                style={{ data: { fill: INDICATOR, stroke: BAR_BORDER,
                    strokeWidth: '1px' } }}
                size={4}
                x={1}
                y={0}/>
        </VictoryChart>
    );
};

FrequencyGraph.propTypes = {
    taxRateIdx: PropTypes.number,
    activeTaxRate: PropTypes.number,
};

