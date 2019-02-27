import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { TAX_RATE_DATA_LENGTH } from './data';

export const TaxRateSlider = ({taxRateIdx, handleTaxRateIdx}) => {
    return (
        <form className="tax-rate-slider">
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <div style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={1}
                                max={TAX_RATE_DATA_LENGTH}
                                values={[taxRateIdx ?
                                    taxRateIdx : 1]}
                                snap={true}
                                onValuesUpdated={(sliderState) => {
                                    handleTaxRateIdx(
                                        sliderState.values[0]);
                                }} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

TaxRateSlider.propTypes = {
    taxRateIdx: PropTypes.number,
    handleTaxRateIdx: PropTypes.func,
};
