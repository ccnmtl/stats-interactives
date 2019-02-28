import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';

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

export const TaxRateSlider = ({taxRateIdx, handleTaxRateIdx}) => {
    return (
        <form className="tax-rate-slider">
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
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
};
