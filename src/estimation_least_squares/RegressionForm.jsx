import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import ReactTooltip from 'react-tooltip';
import { NumericField } from '../utility_components/NumericField';
import { InlineMath } from 'react-katex';
import * as math from 'mathjs';

export const RegressionForm = ({seed, handleSeed, handleGeneratePop,
    slope, intercept, handleSlope, handleIntercept, handleShowBestFit,
    reset, hasPopulation, beta, alpha, showBestFit, isAssessment}) => {
    const hndlSeed = (e) => {
        handleSeed(e.target.value);
    };
    const handleGenPop = (e) => {
        e.preventDefault();
        handleGeneratePop();
    };
    const hndlBestFit = (e) => {
        e.preventDefault();
        handleShowBestFit();
    };
    const hndlReset = (e) => {
        e.preventDefault();
        reset();
    };
    return (
        <>
        <form onSubmit={handleGenPop}
            className="needs-validation" noValidate >
            <fieldset>
                <div className="form-group">
                    <div className="form-row">
                        <p>Enter text into the seed field below to generate a
                            unique sample, and then change the slope and the
                            intercept of the regression prediction equation to
                            see how the residuals (the prediction error)
                            change. The graph to the right shows the sum of
                            squared residuals. Try to come close to the OLS
                            prediction equation, which is the prediction line
                            which minimizes the sum of squared residuals.
                        {!isAssessment && 'You can see the OLS prediction ' +
                            'equation by clicking on the Toggle Best Fit ' +
                            'button below.'}
                        </p>
                    </div>
                    <div className="form-row">
                        <label htmlFor="seed" className="float-right">
                            Seed:</label>
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="seed-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="seed-tt" event="focus"
                            eventOff="blur">
                            <span>Enter a different value to see a
                                different simulation</span>
                        </ReactTooltip>
                    </div>
                    <div>
                        <input type="text"
                            id="seed"
                            className={
                                seed ? 'form-control is-valid' :
                                    'form-control' }
                            value={seed}
                            onChange={hndlSeed}
                            placeholder={
                                'Enter a seed to generate a sample'}
                            autoFocus required/>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <input className="btn btn-primary btn-block"
                                disabled={seed ? false : true}
                                id="generate-population"
                                type="submit"
                                value="Generate Samples"/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        { hasPopulation &&
            <form onSubmit={(e) => {e.preventDefault();}}>
                <fieldset>
                    <div className={'form-group'}>
                        <div className={'form-row ls-form-row'}>
                            <div className={'ls-form-col ls-col-a'}>
                                <label htmlFor={'slope'}>
                                    Slope:
                                </label>
                                <span className="help-tooltip"
                                    tabIndex="0"
                                    data-tip
                                    data-for="slope-tt">
                                    <sup>
                                        <i className="fas fa-question-circle">
                                        </i>
                                    </sup>
                                </span>
                                <ReactTooltip id="slope-tt" event="focus"
                                    eventOff="blur">
                                    <InlineMath>
                                        {String.raw`b_0`}
                                    </InlineMath>
                                </ReactTooltip>
                                <NumericField
                                    id={'slope'}
                                    className={'form-control form-control-sm'}
                                    min={-5}
                                    max={5}
                                    value={math.round(slope, 2)}
                                    step={0.01}
                                    onChange={handleSlope} />
                            </div>
                            <div className={'ls-form-col ls-col-b'}>
                                {showBestFit &&
                                    <span className={'best-fit-label'}>
                                        Best Fit Slope: {math.round(beta, 2)}
                                    </span>}
                            </div>
                        </div>
                        <div className={'form-row'}>
                            <div style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    min={0}
                                    max={999}
                                    values={[(slope * 100) + 500]}
                                    onValuesUpdated={(sliderState) => {
                                        handleSlope(
                                            (sliderState.values[0] * 0.01) - 5);
                                    }} />
                            </div>
                        </div>
                        <div className={'form-row ls-form-row'}>
                            <div className={'ls-form-col ls-col-a'}>
                                <label htmlFor={'intercept'}>
                                    Intercept:
                                </label>
                                <span className="help-tooltip"
                                    tabIndex="0"
                                    data-tip
                                    data-for="intercept-tt">
                                    <sup>
                                        <i className="fas fa-question-circle">
                                        </i>
                                    </sup>
                                </span>
                                <ReactTooltip id="intercept-tt" event="focus"
                                    eventOff="blur">
                                    <InlineMath>
                                        {String.raw`b_1`}
                                    </InlineMath>
                                </ReactTooltip>
                                <NumericField
                                    id={'intercept'}
                                    className={'form-control form-control-sm'}
                                    min={-4}
                                    max={4}
                                    step={0.01}
                                    value={math.round(intercept, 2)}
                                    onChange={handleIntercept} />
                            </div>
                            <div className={'ls-form-col ls-col-b'}>
                                {showBestFit &&
                                    <span className={'best-fit-label'}>
                                        Best Fit Intercept: {
                                            math.round(alpha, 2)}
                                    </span>}
                            </div>
                        </div>
                        <div className={'form-row'}>
                            <div style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    min={0}
                                    max={799}
                                    values={[(intercept * 100) + 400]}
                                    onValuesUpdated={(sliderState) => {
                                        handleIntercept(
                                            (sliderState.values[0] * 0.01) - 4);
                                    }} />
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        }
        {hasPopulation &&
            <form onSubmit={(e) => {e.preventDefault();}}
                className="needs-validation" noValidate >
                <fieldset>
                    <div className="form-group">
                        <div className="form-group">
                            {!isAssessment &&
                            <div className="form-row">
                                <input className="btn btn-primary btn-block"
                                    disabled={!hasPopulation}
                                    id="generate-population"
                                    type="submit"
                                    onClick={hndlBestFit}
                                    value="Toggle Best Fit"/>
                            </div>}
                            <div className="form-row">
                                <input className="btn btn-danger btn-block"
                                    disabled={!hasPopulation}
                                    id="generate-population"
                                    type="submit"
                                    onClick={hndlReset}
                                    value="Reset"/>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        }
        </>
    );
};

RegressionForm.propTypes = {
    seed: PropTypes.string,
    handleSeed: PropTypes.func,
    handleGeneratePop: PropTypes.func,
    slope: PropTypes.number,
    intercept: PropTypes.number,
    handleSlope: PropTypes.func,
    handleIntercept: PropTypes.func,
    handleShowBestFit: PropTypes.func,
    reset: PropTypes.func,
    hasPopulation: PropTypes.bool,
    beta: PropTypes.number,
    alpha: PropTypes.number,
    showBestFit: PropTypes.bool,
    isAssessment: PropTypes.bool,
};
