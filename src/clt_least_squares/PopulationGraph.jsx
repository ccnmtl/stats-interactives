import React from 'react';
import PropTypes from 'prop-types';
import { DOT_SIZE } from './CLTLeastSquares';
import { BAR_BORDER, INACTIVE } from '../colors.js';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

const X_MIN = 0;
const X_MAX = 1;
const Y_MIN = -5;
const Y_MAX = 5;

import {
    VictoryChart, VictoryTheme, VictoryLine,
    VictoryScatter, VictoryAxis} from 'victory';

export const PopulationGraph = ({
    population, populationRegression, sampleIdx}) => {
    return (
        <VictoryChart theme={VictoryTheme.material}
            padding={{left: 50, top: 20, right: 20, bottom: 50}}
            domain={{x: [X_MIN, X_MAX], y: [Y_MIN, Y_MAX]}}>
            <VictoryAxis
                dependentAxis={true}
                style={{
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={math.range(Y_MIN, Y_MAX, true).map((val) => {
                    return val;
                })} />
            <VictoryAxis
                orientation={'bottom'}
                style={{
                    tickLabels: {
                        fontSize: 12,
                    }
                }}
                tickValues={math.range(X_MIN, X_MAX, 0.1, true).map((val) => {
                    return math.round(val, 1);
                })} />
            {population &&
                <VictoryScatter data={population[sampleIdx]}
                    style={{ data: { fill: INACTIVE, stroke: BAR_BORDER,
                        strokeWidth: 2 } }}
                    size={DOT_SIZE}
                    y={(datum) => datum[1]}
                    x={(datum) => datum[0]} />
            }
            {populationRegression &&
                <VictoryLine
                    samples={10}
                    style={{ data: { fill: 'blue', stroke: 'red',
                        strokeWidth: '3px' } }}
                    y={(d) => {
                        let slope = populationRegression[sampleIdx][0];
                        let intercept = populationRegression[sampleIdx][1];
                        return slope * d.x + intercept;}} />
            }
        </VictoryChart>
    );
};

PopulationGraph.propTypes = {
    population: PropTypes.array,
    populationRegression: PropTypes.array,
    sampleIdx: PropTypes.number,
};
