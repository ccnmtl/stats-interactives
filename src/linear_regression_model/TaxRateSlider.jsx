import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';
import { BlockMath, InlineMath } from 'react-katex';

const getTaxRateFromIdx = (val) => {
    let taxRateIdx = Math.floor((val)/ 20);
    switch (taxRateIdx) {
    case 0:
        return '3';
    case 1:
        return '5';
    case 2:
        return '7';
    case 3:
        return '7.5';
    default:
        return '';
    }
};

const TaxRatePitComponent = ({ style, children }) => {
    return (
        <div aria-hidden="true"
            className={'lrm-slider-pit'}
            id={children == 60 ? 'lrm-slider-pit-last' : ''}
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
                {getTaxRateFromIdx(children) + '%'}
            </div>
        </div>
    );
};

export const TaxRateSlider = ({taxRateIdx,
    handleTaxRateIdx, y_i, mean, epsilon, isStateA}) => {
    return (
        <form onSubmit={(e) => {e.preventDefault();}}
            className="tax-rate-slider was-validated"
            noValidate={true} >
            <fieldset>
                <div className="form-group">
                    <label htmlFor="observation-slider">
                        Tax rate observations for {
                            getTaxRateFromIdx(taxRateIdx) + '%'}:
                        &nbsp;i =&nbsp;<NumericField
                            id={'tax-rate-field'}
                            className={'form-control form-control-sm'}
                            min={1}
                            max={80}
                            value={(taxRateIdx + 1)}
                            onChange={(val) => {handleTaxRateIdx(val -1);}}/>
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
                            min={1}
                            max={80}
                            values={[taxRateIdx]}
                            pitComponent={TaxRatePitComponent}
                            pitPoints={[0, 20, 40, 60]}
                            onValuesUpdated={(sliderState) => {
                                handleTaxRateIdx(
                                    sliderState.values[0] - 1);
                            }} />
                    </div>
                </div>
                <div className={'lrm-values'}>
                    <p>
                        <InlineMath>
                            {String.raw`Y_{${taxRateIdx + 1}} = ${y_i}`}
                        </InlineMath>
                    </p>
                    <p>
                        <InlineMath>
                            {/* eslint-disable-next-line */}
                            {String.raw`\mu_Y = 29 - 2 \cdot ${getTaxRateFromIdx(taxRateIdx)} = ${mean}`}
                        </InlineMath>
                    </p>
                    <p>
                        <InlineMath>
                            {String.raw`
                                \varepsilon_{${taxRateIdx + 1}} = ${epsilon}`}
                        </InlineMath>
                    </p>
                </div>
                {isStateA ? (
                <>
                    <div className={'lrm-copy'}>
                        <p>This scatter plot illustrates the
                            basic assumptions of the OLS
                            regression. On average, people
                            smoke different number of
                            cigarettes at different levels of
                            cigarette tax. We assume the
                            average number of cigs smoked is
                            given by the formula below. People
                            might smoke more or less than the
                            average number of cigarettes due
                            to other factors.
                        </p>
                        <p>Click through different tax rates
                            to see the distribution of number
                            of cigarettes for a particular tax
                            rate. For each tax level you can
                            click through different smokers to
                            see how many cigarettes they
                            consumed.
                        </p>
                        <p>Notice we reverse the axes for this
                            scatter plot so that the
                            explanatory variable is on the
                            y-axis and the response variable
                            is on the x-axis. We did this so
                            that you can better visualize the
                            histogram of the number of
                            cigarettes. (More familiar, easier
                            to read, etc even though it is not
                            the convention) Use the toggle
                            above to switch the axis to the
                            conventional framework -- where
                            the explanatory variable is on the
                            x-axis and the response variable
                            is on the y-axis.
                        </p>
                        <div>
                            <BlockMath>
                                \mu_Y = 29 - 2 \cdot x
                            </BlockMath>
                        </div>
                    </div>
                </>
                ) : (
                    <div className={'lrm-copy'}>
                        <p>The scatter plot is now shown in
                            the conventional way with the
                            explanatory variable on the x-axis
                            and the response variable on the
                            y-axis. Notice that it represents
                            the same relationship between
                            cigarettes and cigarette tax as
                            before. The tilted histograms to
                            the left show the same distribution
                            of the number of cigarettes smoked
                            on average for each level of
                            taxation.
                        </p>
                    </div>
                )}
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
    isStateA: PropTypes.bool,
};
