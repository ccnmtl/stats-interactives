import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';

const getTaxRateFromIdx = (val) => {
    switch (val) {
    case 0:
        return '3%';
    case 19:
        return '5%';
    case 39:
        return '7%';
    case 59:
        return '7.5%';
    default:
        return '';
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

export const TaxRateSlider = ({taxRateIdx,
    handleTaxRateIdx, y_i, mean, epsilon}) => {
    return (
        <form onSubmit={(e) => {e.preventDefault();}}
            className="tax-rate-slider was-validated"
            noValidate={true} >
            <fieldset>
                <div className="form-group">
                    <label htmlFor="observation-slider">
                        Tax rate observations for {
                            getTaxRateFromIdx(Math.floor(taxRateIdx / 20))}:
                        &nbsp;i =&nbsp;<NumericField
                            id={'tax-rate-field'}
                            className={'form-control form-control-sm'}
                            min={0}
                            max={79}
                            value={(taxRateIdx)}
                            onChange={handleTaxRateIdx}/>
                    </label>
                    <div className='invalid-feedback'>
                        The number entered is outside the
                        range of the dataset.
                    </div>
                    <div id={'observation-slider'}
                        style={{ height: '50px',
                            width: '100%',
                            marginBottom: '3em'}}>
                        <Rheostat
                            min={0}
                            max={79}
                            values={[taxRateIdx]}
                            pitComponent={TaxRatePitComponent}
                            pitPoints={[0, 19, 39, 59]}
                            onValuesUpdated={(sliderState) => {
                                handleTaxRateIdx(
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
    handleTaxRateIdx: PropTypes.func,
    y_i: PropTypes.number,
    mean: PropTypes.number,
    epsilon: PropTypes.number,
};
