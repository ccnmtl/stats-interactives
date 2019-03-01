import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { forceNumber } from '../utils';

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
    const handleFocus = (e) => {
        e.target.select();
    };
    return (
        <form onSubmit={(e) => {e.preventDefault();}}
            className="tax-rate-slider">
            <fieldset>
                <div className="form-row">
                    <div className="form-group col-10">
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
                    <div className={'form-group col-1 form-inline'}>
                        i =&nbsp;<input
                            type='number'
                            id={'tax-rate-idx'}
                            min={1}
                            max={100}
                            className="form-control form-control-sm"
                            value={[taxRateIdx ?
                                taxRateIdx : 1]}
                            onFocus={handleFocus}
                            onChange={(event) => {
                                event.preventDefault();
                                let val = forceNumber(event.target.value);
                                if (val >= 1 && val <= 100) {
                                    handleTaxRateIdx(val);
                                }
                            }} />
                    </div>
                    <div className={'form-group col-1 form-inline'}>
                        Flip Graphs?
                        <input type="checkbox"
                            value={flipGraphs}
                            onChange={handleFlipGraphs}/>
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
    flipGraphs: PropTypes.bool,
    handleFlipGraphs: PropTypes.func,
};
