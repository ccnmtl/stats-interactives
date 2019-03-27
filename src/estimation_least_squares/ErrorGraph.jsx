import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryGroup, VictoryTheme, VictoryArea} from 'victory';
import * as math from 'mathjs';
math.config({matrix: 'Array'});

export const ErrorGraph = ({optimalSize, errorSize,
    showBestFit, estimatedSSEOpacity}) => {
    return (
        <div className={'error-graph-container'}>
            <VictoryGroup theme={VictoryTheme.material}
                padding={{left: 0, top: 0, right: 0, bottom: 0}}
                domain={{x: [0, 1], y: [0, 1]}}>
                <VictoryArea
                    style={{data: {
                        fill: 'red',
                        fillOpacity: estimatedSSEOpacity }}}
                    data={[{x: 0, y: errorSize},
                        {x: errorSize, y: errorSize}]}/>
                {showBestFit &&
                <VictoryArea
                    style={{data: { fill: 'green', fillOpacity: 1 }}}
                    data={[{x: 0, y: optimalSize},
                        {x: optimalSize, y: optimalSize}]}/>
                }
            </VictoryGroup>
        </div>
    );
};

ErrorGraph.propTypes = {
    optimalSize: PropTypes.number,
    errorSize: PropTypes.number,
    showBestFit: PropTypes.bool,
    estimatedSSEOpacity: PropTypes.number,
};
