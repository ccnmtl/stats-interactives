import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { NumericField } from '../utility_components/NumericField';
import { InlineMath } from 'react-katex';
import { Tooltip } from '../utility_components/Tooltip';

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

export const TaxRateSlider = ({taxRateIdx,
    handleTaxRateIdx, y_i, mean, epsilon, isStateA}) => {
    return (
        <form onSubmit={(e) => {e.preventDefault();}}
            className="tax-rate-slider was-validated"
            noValidate={true} >
            <fieldset>
                {isStateA && (
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
                            . A given smoker might smoke more or less
                            than another smoker who faces the same tax rate due
                            to other factors (income, age, education, etc.)
                        </p>
                    </div>
                )}
                <div className="form-group">
                    <div className="form-row">
                        <strong>
                            Tax rate observations for {
                                getTaxRateFromIdx(taxRateIdx) + '%'}
                        </strong>
                    </div>
                    <div className="form-row tax-rate-data-row">
                        <div className="col-12 tax-rate-datum">
                            <label htmlFor="observation-slider">
                                <InlineMath>
                                    {String.raw`i =`}
                                </InlineMath>
                                &nbsp;<NumericField
                                    tabIndex="0"
                                    id={'tax-rate-field'}
                                    className={'form-control form-control-sm'}
                                    min={1}
                                    max={80}
                                    value={(taxRateIdx + 1)}
                                    onChange={(val) => {
                                        handleTaxRateIdx(val -1);}}/>
                                <div className='invalid-feedback'>
                                    The number entered is outside the
                                    range of the dataset.
                                </div>
                                <Tooltip tooltip={
                                    <sup>
                                        <i className="fas fa-question-circle">
                                        </i>
                                    </sup>}>
                                    <span>Represents a single smoker in the tax
                                        data, used to index into&nbsp;
                                    <InlineMath>
                                        {String.raw`y`}
                                    </InlineMath></span>
                                </Tooltip>
                            </label>
                            <div id={'observation-slider'}
                                style={{ height: '50px',
                                    width: '100%',
                                    paddingLeft: '8.5em',
                                    marginTop: '-1.55em',
                                    marginBottom: '1em'}}>
                                <Rheostat
                                    min={1}
                                    max={80}
                                    values={[taxRateIdx + 1]}
                                    onValuesUpdated={(sliderState) => {
                                        handleTaxRateIdx(
                                            sliderState.values[0] - 1);
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row tax-rate-data-row">
                        <div className={isStateA ? ('col-6') : ('col-12') +
                                ' tax-rate-datum'}>
                            <InlineMath>
                                {String.raw`x_{${taxRateIdx + 1}} = ${
                                    getTaxRateFromIdx(taxRateIdx)}`}
                            </InlineMath>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Represents the tax rate a smoker is
                                    subject to</span>
                            </Tooltip>
                        </div>
                        <div className={isStateA ? ('col-6') : ('col-12') +
                                ' tax-rate-datum'}>
                            <InlineMath>
                                {String.raw`y_{${taxRateIdx + 1}} = ${y_i}`}
                            </InlineMath>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Represents the number of cigarettes per
                                    day a given person smokes</span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="form-row tax-rate-data-row">
                        <div className={isStateA ? ('col-6') : ('col-12') +
                                ' tax-rate-datum'}>
                            <InlineMath>
                                {/* eslint-disable-next-line */}
                                {String.raw`\mu_Y = 29 - 2 \cdot ${getTaxRateFromIdx(taxRateIdx)} = ${mean}`}
                            </InlineMath>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Mean of all smokers</span>
                            </Tooltip>
                        </div>
                        <div className={isStateA ? ('col-6') : ('col-12') +
                                ' tax-rate-datum'}>
                            <InlineMath>
                                {/* eslint-disable-next-line */}
                                {String.raw`\varepsilon_{${taxRateIdx + 1}} = ${epsilon}`}
                            </InlineMath>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Deviation from the mean</span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                {isStateA ? (
                <>
                    <div className={'lrm-copy'}>
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

TaxRateSlider.propTypes = {
    taxRateIdx: PropTypes.number,
    handleTaxRateIdx: PropTypes.func,
    y_i: PropTypes.number,
    mean: PropTypes.number,
    epsilon: PropTypes.number,
    isStateA: PropTypes.bool,
};
