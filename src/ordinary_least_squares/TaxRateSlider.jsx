import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';

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
                {((children) => {
                    switch (children) {
                    case 1:
                        return '3%';
                    case 25:
                        return '5%';
                    case 50:
                        return '7%';
                    case 75:
                        return '7.5%';
                    }
                })(children)}
            </div>
        </div>
    );
};

export const TaxRateSlider = ({taxRateIdx, handleTaxRateIdx,
    flipGraphs, handleFlipGraphs}) => {
    return (
        <form onSubmit={(e) => {e.preventDefault();}}
            className="tax-rate-slider was-validated"
            noValidate >
            <fieldset>
                <div className="form-group">
                    <div style={{ height: '50px', width: '100%'}}>
                        <Rheostat
                            min={1}
                            max={100}
                            values={[taxRateIdx ?
                                taxRateIdx : 1]}
                            pitComponent={TaxRatePitComponent}
                            pitPoints={[1, 25, 50, 75]}
                            onValuesUpdated={(sliderState) => {
                                handleTaxRateIdx(
                                    sliderState.values[0]);
                            }} />
                    </div>
                </div>
                <div className={'form-group form-inline'}>
                    i =&nbsp;<NumericField
                        id={'tax-rate-field'}
                        className={'form-control form-control-sm'}
                        min={1}
                        max={100}
                        value={taxRateIdx ? taxRateIdx : 1}
                        onChange={handleTaxRateIdx}/>
                    <div className='invalid-feedback'>
                        The number entered is outside the
                        range of the dataset.
                    </div>
                </div>
                <div className={'form-group form-inline'}>
                    Flip Graphs?
                    <input type="checkbox"
                        value={flipGraphs}
                        onChange={handleFlipGraphs}/>
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
    flipGraphs: PropTypes.bool,
    handleFlipGraphs: PropTypes.func,
};
