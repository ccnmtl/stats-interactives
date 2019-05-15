import React from 'react';
import PropTypes from 'prop-types';
import { TaxRateSlider } from './TaxRateSlider';
import { TaxRateGraphA, TaxRateGraphB } from './TaxRateGraph';
import { FrequencyGraphA, FrequencyGraphB } from './FrequencyGraph';

export const StateAContainer = ({taxRateIdx, handleTaxRateIdx, y_i,
    mean, epsilon, activeDataIdx}) => {
    return (
        <div className="container state-a-container">
            <div className="row">
                <div className="col-7 state-a-info-container">
                    <div>
                        <TaxRateSlider
                            taxRateIdx={taxRateIdx}
                            handleTaxRateIdx={
                                handleTaxRateIdx}
                            y_i={y_i}
                            mean={mean}
                            epsilon={epsilon}
                            isStateA={true}/>
                    </div>
                </div>
                <div className="col-5 state-a-graph-container">
                    <div className={
                        'graph-A-container tax-rate-graph'}>
                        <TaxRateGraphA
                            taxRateIdx={taxRateIdx}
                            activeDataIdx={activeDataIdx}
                            handleTaxRateIdx={handleTaxRateIdx}/>
                    </div>
                    <div className={
                        'graph-A-container frequency-graph'}>
                        <FrequencyGraphA
                            taxRateIdx={taxRateIdx}
                            activeDataIdx={activeDataIdx}
                            handleTaxRateIdx={handleTaxRateIdx}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StateBContainer = ({taxRateIdx, handleTaxRateIdx, y_i,
    mean, epsilon, activeDataIdx}) => {
    return (
        <div className="container state-b-container">
            <div className="row state-b-graph-container">
                <div className={'col-4 state-b-info-container'}>
                    <TaxRateSlider
                        taxRateIdx={taxRateIdx}
                        handleTaxRateIdx={
                            handleTaxRateIdx}
                        y_i={y_i}
                        mean={mean}
                        epsilon={epsilon}
                        isStateA={false}/>
                </div>
                <div className={
                    'col-3 graph-B-container frequency-graph'} >
                    <div>
                        <FrequencyGraphB
                            taxRateIdx={taxRateIdx}
                            activeDataIdx={activeDataIdx}
                            handleTaxRateIdx={handleTaxRateIdx}/>
                    </div>
                </div>
                <div className={
                    'col-5 graph-B-container tax-rate-graph'}>
                    <div>
                        <TaxRateGraphB
                            taxRateIdx={taxRateIdx}
                            activeDataIdx={activeDataIdx}
                            handleTaxRateIdx={handleTaxRateIdx}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

StateAContainer.propTypes = {
    taxRateIdx: PropTypes.number,
    handleTaxRateIdx: PropTypes.func,
    y_i: PropTypes.number,
    mean: PropTypes.number,
    epsilon: PropTypes.number,
    activeDataIdx: PropTypes.array,
};

StateBContainer.propTypes = {
    taxRateIdx: PropTypes.number,
    handleTaxRateIdx: PropTypes.func,
    y_i: PropTypes.number,
    mean: PropTypes.number,
    epsilon: PropTypes.number,
    activeDataIdx: PropTypes.array,
};

