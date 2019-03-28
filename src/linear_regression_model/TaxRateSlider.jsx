import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';

const getTaxRateFromIdx = (val) => {
    let taxRateIdx = Math.floor((val + 1) / 20);
    switch (taxRateIdx) {
    case 0:
        return '3%';
    case 1:
        return '5%';
    case 2:
        return '7%';
    case 3:
        return '7.5%';
    default:
        return '';
    }
};

const TaxRatePitComponent = ({ style, children }) => {
    return (
        <div
            className={'lrm-slider-pit'}
            id={children == 0 ? 'lrm-slider-pit-first' : ''}
            style={{
                ...style,
                background: '#a2a2a2',
                height: 12,
                top: 10,
                display: 'flex',
                justifyContent: 'center',
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
                            getTaxRateFromIdx(taxRateIdx)}:
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
