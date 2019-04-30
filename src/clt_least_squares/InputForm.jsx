import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import ReactTooltip from 'react-tooltip';
import { NumericField } from '../utility_components/NumericField';
import { InlineMath } from 'react-katex';
import * as math from 'mathjs';

export const InputForm = ({seed, handleSeed, handleGeneratePop, beta,
    handleBeta, alpha, handleAlpha, hasPopulation, stdDev, handleStdDev,
    sampleIdx, handleSampleIdx}) => {
    const hndlSeed = (e) => {
        handleSeed(e.target.value);
    };
    const handleGenPop = (e) => {
        e.preventDefault();
        handleGeneratePop();
    };
    return (
        <>
        <form onSubmit={handleGenPop}
            className="needs-validation clt-least-squares-form" noValidate >
            <fieldset>
                <div className="form-group">
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
                                'Enter a seed to start the simulation'}
                            autoFocus required/>
                    </div>
                </div>
                { seed &&
                <div className={'form-group'}>
                    <div className={'form-row'}>
                        <label htmlFor={'alpha'}>
                            <InlineMath>
                                {String.raw`\beta_0`}
                            </InlineMath>
                        </label>
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="alpha-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="alpha-tt" event="focus"
                            eventOff="blur">
                            <span>Intercept of the regression.</span>
                        </ReactTooltip>
                        <NumericField
                            id={'alpha'}
                            className={
                                'form-control form-control-sm numeric-field'}
                            min={-1}
                            max={1}
                            step={0.01}
                            value={math.round(alpha, 2)}
                            onChange={handleAlpha} />
                    </div>
                    <div className={'form-row'}>
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
                    <div className={'form-row'}>
                        <label htmlFor={'slope'}>
                            <InlineMath>
                                {String.raw`\beta_1`}
                            </InlineMath>
                        </label>
                        <span className="help-tooltip"
                            tabIndex="0"
                            data-tip
                            data-for="beta-tt">
                            <sup>
                                <i className="fas fa-question-circle"></i>
                            </sup>
                        </span>
                        <ReactTooltip id="beta-tt" event="focus"
                            eventOff="blur">
                            <span>Slope of the regression.</span>
                        </ReactTooltip>
                        <NumericField
                            id={'beta'}
                            className={
                                'form-control form-control-sm numeric-field'}
                            min={-1}
                            max={1}
                            value={math.round(beta, 2)}
                            step={0.01}
                            onChange={handleBeta} />
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
                    <div className={'form-row'}>
                        <label htmlFor={'std-dev'}>
                            Standard Deviation:
                        </label>
                        <NumericField
                            id={'std-dev'}
                            className={'form-control form-control-sm'}
                            min={0.2}
                            max={1}
                            step={0.01}
                            value={stdDev}
                            onChange={handleStdDev} />
                    </div>
                    <div className={'form-row'}>
                        <div style={{ height: '50px', width: '100%'}}>
                            <Rheostat
                                min={20}
                                max={100}
                                values={[(stdDev * 100)]}
                                onValuesUpdated={(sliderState) => {
                                    handleStdDev(
                                        (sliderState.values[0] * 0.01));
                                }} />
                        </div>
                    </div>
                    <div className="form-row">
                        <input className="btn btn-primary btn-block"
                            disabled={seed ? false : true}
                            id="generate-population"
                            type="submit"
                            value="Generate Population"/>
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
                                min={0}
                                max={99}
                                value={sampleIdx}
                                step={1}
                                onChange={handleSampleIdx} />
                        </div>
                        <div className={'form-row'}>
                            <div style={{ height: '50px', width: '100%'}}>
                                <Rheostat
                                    min={0}
                                    max={99}
                                    values={[sampleIdx]}
                                    onValuesUpdated={(sliderState) => {
                                        handleSampleIdx(sliderState.values[0]);
                                    }} />
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        }
        </>
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
    stdDev: PropTypes.number,
    handleStdDev: PropTypes.func,
    sampleIdx: PropTypes.number,
    handleSampleIdx: PropTypes.func,
    hasPopulation: PropTypes.bool,
};
