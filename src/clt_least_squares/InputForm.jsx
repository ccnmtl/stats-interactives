import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import { Tooltip } from '../utility_components/Tooltip';
import { NumericField } from '../utility_components/NumericField';
import { InlineMath } from 'react-katex';
import { create, all } from 'mathjs';
let config = {
    matrix: 'Array'
};
const math = create(all, config);

export const InputForm = ({seed, handleSeed, handleGeneratePop, beta,
    handleBeta, alpha, handleAlpha, hasPopulation, variance, handleVariance,
    sampleIdx, handleSampleIdx, populationRegression, populationVariance}) => {
    const hndlSeed = (e) => {
        handleSeed(e.target.value);
    };
    const handleGenPop = (e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            handleGeneratePop();
        }
    };
    return (
        <div className={'sp-sticky-top'}>
            <form onSubmit={handleGenPop}
                className="was-validated clt-least-squares-form"
                noValidate={true} >
                <fieldset>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="seed" className="float-right">
                                Seed:</label>
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Enter a different value to see a
                                    different simulation</span>
                            </Tooltip>
                        </div>
                        <div>
                            <input type="text"
                                id="seed"
                                className={'form-control'}
                                value={seed}
                                onChange={hndlSeed}
                                placeholder={
                                    'Enter a seed to start the simulation'}
                                autoFocus required/>
                        </div>
                    </div>
                    { seed &&
                    <div className={'form-group'}>
                        <div className={'form-row flex-nowrap'}>
                            <label htmlFor={'alpha'}>
                                <InlineMath>
                                    {String.raw`\beta_0`}
                                </InlineMath>
                            </label>
                            <NumericField
                                id={'alpha'}
                                className={'form-control form-control-sm \
                                    numeric-field'}
                                min={-1}
                                max={1}
                                step={0.01}
                                value={math.round(alpha, 2)}
                                onChange={handleAlpha} />
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Intercept of the regression model</span>
                            </Tooltip>
                            <div className='invalid-feedback'>
                                The number entered is outside the
                                range of the dataset.
                            </div>
                        </div>
                        <div className={'form-row flex-nowrap'}>
                            <div style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    min={-100}
                                    max={100}
                                    values={[math.round(alpha * 100, 2)]}
                                    onValuesUpdated={(sliderState) => {
                                        handleAlpha(
                                            (sliderState.values[0] * 0.01));
                                    }} />
                            </div>
                        </div>
                        <div className={'form-row flex-nowrap'}>
                            <label htmlFor={'slope'}>
                                <InlineMath>
                                    {String.raw`\beta_1`}
                                </InlineMath>
                            </label>
                            <NumericField
                                id={'beta'}
                                className={'form-control form-control-sm \
                                    numeric-field'}
                                min={-1}
                                max={1}
                                value={math.round(beta, 2)}
                                step={0.01}
                                onChange={handleBeta} />
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Slope of the regression model</span>
                            </Tooltip>
                            <div className='invalid-feedback'>
                                The number entered is outside the
                                range of the dataset.
                            </div>
                        </div>
                        <div className={'form-row'}>
                            <div style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    min={-100}
                                    max={100}
                                    values={[math.round(beta * 100, 2)]}
                                    onValuesUpdated={(sliderState) => {
                                        handleBeta(
                                            (sliderState.values[0] * 0.01));
                                    }} />
                            </div>
                        </div>
                        <div className={'form-row flex-nowrap'}>
                            <label htmlFor={'variance'}>
                                <InlineMath>
                                    {String.raw`\sigma^2`}
                                </InlineMath>
                            </label>
                            <NumericField
                                id={'variance'}
                                className={'form-control form-control-sm'}
                                min={0.5}
                                max={1.5}
                                step={0.01}
                                value={math.round(variance, 2)}
                                onChange={handleVariance} />
                            <Tooltip tooltip={
                                <sup>
                                    <i className="fas fa-question-circle">
                                    </i>
                                </sup>}>
                                <span>Variance of the disturbances</span>
                            </Tooltip>
                            <div className='invalid-feedback'>
                                The number entered is outside the
                                range of the dataset.
                            </div>
                        </div>
                        <div className={'form-row'}>
                            <div style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    min={50}
                                    max={150}
                                    values={[math.round(variance * 100, 2)]}
                                    onValuesUpdated={(sliderState) => {
                                        handleVariance(
                                            (sliderState.values[0] * 0.01));
                                    }} />
                            </div>
                        </div>
                        <div className="form-row">
                            <input className="btn btn-primary btn-block"
                                disabled={seed ? false : true}
                                id="generate-population"
                                type="submit"
                                value="Generate Samples"/>
                        </div>
                    </div>}
                </fieldset>
            </form>
            { hasPopulation &&
                <form onSubmit={(e) => {e.preventDefault();}}>
                    <fieldset>
                        <div className={'form-group'}>
                            <div className={'form-row'}>
                                <label htmlFor={'sample'}>
                                    Sample:
                                </label>
                                <NumericField
                                    id={'sample'}
                                    className={'form-control form-control-sm'}
                                    min={1}
                                    max={100}
                                    value={sampleIdx + 1}
                                    step={1}
                                    onChange={(val) => {
                                        handleSampleIdx(val - 1);
                                    }} />
                            </div>
                            <div className={'form-row'}>
                                <div style={{ height: '50px', width: '100%'}}>
                                    <Rheostat
                                        min={1}
                                        max={100}
                                        values={[sampleIdx]}
                                        onValuesUpdated={(sliderState) => {
                                            handleSampleIdx(
                                                sliderState.values[0] - 1);
                                        }} />
                                </div>
                            </div>
                            <div className={'form-row'}>
                                <div className={'col-12 clt-ols-active-values'}>
                                    <InlineMath>
                                        {String.raw`b_0 = ${math.round(
                                            /* eslint-disable-next-line */
                                            populationRegression[sampleIdx][1], 2)
                                        }`}
                                    </InlineMath>
                                    <Tooltip tooltip={
                                        <sup>
                                            <i className={
                                                'fas fa-question-circle'}>
                                            </i>
                                        </sup>}>
                                        <span>
                                                Intercept of the
                                                prediction equation
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className={'form-row clt-ols-active-values'}>
                                <div className={'col-12'}>
                                    <InlineMath>
                                        {String.raw`b_1 = ${math.round(
                                            /* eslint-disable-next-line */
                                            populationRegression[sampleIdx][0], 2)
                                        }`}
                                    </InlineMath>
                                    <Tooltip tooltip={
                                        <sup>
                                            <i className={
                                                'fas fa-question-circle'}>
                                            </i>
                                        </sup>}>
                                        <span>
                                                Slope of the
                                                prediction equation
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className={'form-row clt-ols-active-values'}>
                                <div className={'col-12'}>
                                    <InlineMath>
                                        {String.raw`MSE = ${math.round(
                                            populationVariance[sampleIdx], 2)
                                        }`}
                                    </InlineMath>
                                    <Tooltip tooltip={
                                        <sup>
                                            <i className={
                                                'fas fa-question-circle'}>
                                            </i>
                                        </sup>}>
                                        <span>
                                            Mean sum of squares
                                            of the residual
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            }
        </div>
    );
};

InputForm.propTypes = {
    seed: PropTypes.string,
    handleSeed: PropTypes.func,
    handleGeneratePop: PropTypes.func,
    beta: PropTypes.number,
    handleBeta: PropTypes.func,
    alpha: PropTypes.number,
    handleAlpha: PropTypes.func,
    variance: PropTypes.number,
    handleVariance: PropTypes.func,
    sampleIdx: PropTypes.number,
    handleSampleIdx: PropTypes.func,
    hasPopulation: PropTypes.bool,
    populationRegression: PropTypes.array,
    populationVariance: PropTypes.array,
};
