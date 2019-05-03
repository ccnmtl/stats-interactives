import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';
import { InlineMath } from 'react-katex';

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
                            tabIndex="0"
                            id={'tax-rate-field'}
                            className={'form-control form-control-sm'}
                            min={1}
                            max={80}
                            value={(taxRateIdx + 1)}
                            autoFocus
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
                        <p>How do cigarette sales taxes affect the average
                            weekly number of cigarettes consumed by a smoker?
                            The scatterplot to the left shows the relationship
                            between these two variables and illustrates the
                            basic assumption of the OLS regression model. On
                            average, people smoke a different number of
                            cigarettes at different levels of cigarette tax
                            rates. The average number of cigarettes consumed by
                            smokers who face a given cigarette sales tax&nbsp;
                        <InlineMath>
                            {String.raw`(x)`}
                        </InlineMath>
                            &nbsp;is given by the formula &nbsp;
                        <InlineMath>
                            {String.raw`\mu_y=29 - 2 \cdot x`}
                        </InlineMath>
                            &nbsp; A given smoker might smoke more or less
                            than another smoker who faces the same tax rate due
                            to other factors (income, age, education, etc.)
                        </p>
                        <p>Click through different tax rates and examine how
                            the distribution of the number of cigarettes smoked
                            shown on the histograms in the bottom panel
                            changes. For each tax rate you can click through
                            different individual smokers to see how many
                            cigarettes each person consumed on average every
                            week. The formula above shows the effect of
                            cigarette sales taxes on the average number of
                            cigarettes smoked &nbsp;
                        <InlineMath>
                            {String.raw`\mu_y`}
                        </InlineMath>,
                            as well as the individual deviations from that
                            average due to other factors &nbsp;
                        <InlineMath>
                            {String.raw`\varepsilon_i`}
                        </InlineMath>.
                        </p>
                        <p>Notice the axes on this scatter plot are reversed,
                            so that the explanatory variable is on the y-axis
                            and the response variable is on the x-axis. The
                            axes have been reversed to provide a better
                            visualization of the histogram of the number of
                            cigarettes. (Seeing a distribution in this
                            orientation is more familiar, and easier to read,
                            even though it is not the convention.) Use the
                            buttons above to switch the axis to the
                            conventional framework, where the explanatory
                            variable is on the x-axis and the response variable
                            is on the y-axis.
                        </p>
                    </div>
                </>
                ) : (
                    <div className={'lrm-copy'}>
                        <p>The scatter plot is now shown in the conventional
                            orientation, with the explanatory variable on the
                            x-axis and the response variable on the y-axis.
                            Notice that it represents the same relationship
                            between cigarettes smoked and cigarette tax rate as
                            before. The tilted histograms to the left show the
                            same distribution of the number of cigarettes
                            smoked on average for each level of taxation.
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
