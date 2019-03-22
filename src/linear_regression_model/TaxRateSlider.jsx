import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';

const getTaxRateFromIdx = (val) => {
    switch (val) {
    case 0:
        return '3%';
    case 1:
        return '5%';
    case 2:
        return '7%';
    case 3:
        return '7.5%';
    }
};

const TaxRatePitComponent = ({ style, children }) => {
    return (
        <div
            style={{
                ...style,
                background: '#a2a2a2',
                width: 1,
                height: 12,
                top: 10,
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div style={{marginTop: 16}}>
                {getTaxRateFromIdx(children)}
            </div>
        </div>
    );
};

export const TaxRateSlider = ({taxRateIdx, handleTaxRate, handleTaxSampleIdx,
    handleTaxRateIdx, y_i, mean, epsilon}) => {
    return (
        <form onSubmit={(e) => {e.preventDefault();}}
            className="tax-rate-slider was-validated"
            noValidate={true} >
            <fieldset>
                <div className="form-group">
                    <label htmlFor={'tax-rate-slider'}>
                        Cigarette Tax Rates
                    </label>
                    <div id={'tax-rate-slider'}
                        style={{ height: '50px', width: '100%'}}>
                        <Rheostat
                            min={0}
                            max={3}
                            values={[Math.floor(taxRateIdx / 20)]}
                            pitComponent={TaxRatePitComponent}
                            pitPoints={[0, 1, 2, 3]}
                            snap
                            onValuesUpdated={(sliderState) => {
                                handleTaxRate(
                                    sliderState.values[0]);
                            }} />
                    </div>
                    <label htmlFor="observation-slider">
                        Observations for {
                            getTaxRateFromIdx(Math.floor(taxRateIdx / 20))}:
                        &nbsp;i =&nbsp;<NumericField
                            id={'tax-rate-field'}
                            className={'form-control form-control-sm'}
                            min={0}
                            max={19}
                            value={(taxRateIdx % 20)}
                            onChange={handleTaxSampleIdx}/>
                    </label>
                    <div className='invalid-feedback'>
                        The number entered is outside the
                        range of the dataset.
                    </div>
                    <div id={'observation-slider'}
                        style={{ height: '50px', width: '100%'}}>
                        <Rheostat
                            min={0}
                            max={19}
                            values={[(taxRateIdx % 20)]}
                            onValuesUpdated={(sliderState) => {
                                handleTaxSampleIdx(
                                    sliderState.values[0]);
                            }} />
                    </div>
                </div>
                <div className={'form-row lrm-values'}>
                    <div className="col">
                        Y<sub>i</sub>: {y_i}
                    </div>
                    <div className="col">
                        μ: {mean}
                    </div>
                    <div className="col">
                        ε: {epsilon}
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

TaxRatePitComponent.propTypes = {
    style: PropTypes.object,
    children: PropTypes.number
};

TaxRateSlider.propTypes = {
    taxRateIdx: PropTypes.number,
    handleTaxRate: PropTypes.func,
    handleTaxSampleIdx: PropTypes.func,
    handleTaxRateIdx: PropTypes.func,
    y_i: PropTypes.number,
    mean: PropTypes.number,
    epsilon: PropTypes.number,
};
